import React, {
  ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Checkbox } from "expo-checkbox";
import { decodeHTML } from "entities";
import { Text, View } from "@/components/Themed";
import InputTemplate from "@/components/FormTemplate/InputTemplate";
import LabelTemplate from "@/components/FormTemplate/LabelTemplate";
import DropDownTemplate from "@/components/FormTemplate/DropDownTemplate";
import DateTimePickerTemplate from "@/components/FormTemplate/DateTimePickerTemplate";
import ErrorMessageTemplate from "@/components/FormTemplate/ErrorMessageTemplate";
import PopupConfirm from "@/components/FormTemplate/PopupConfirm";
import { ThemeContext } from "@/hooks/useColorScheme";
import { Answer } from "@/hooks/API/ObjectTypes/Answer";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { updateUserInfos } from "@/redux/UserInfos/UserInfosSlice";
import { emailRegex, phoneRegex } from "@/lib/regexFields";
import { type formFieldCast, type hubspotField, type UserState } from "@/types";
import { colors } from "@/config/styles/01-settings/_colors";
import styles from "@/styles/form/FormStyle";
import { router, useLocalSearchParams } from "expo-router";
import { Forms } from "@/hooks/API/Repositories/Forms";
import { HubspotForms } from "@/hooks/API/Repositories/HubspotForms";
import { HubspotForm } from "@/hooks/API/ObjectTypes/HubspotForm";

const FormsRepo = new Forms();
const HubspotFormsRepo = new HubspotForms();
export default function FormScreen(): ReactNode {
  const { id: idForm } = useLocalSearchParams<{ id: string }>();

  if (!idForm) {
    router.back();
    return null;
  }

  const [fields, setFields] = useState<hubspotField[]>([]);

  // VARIABLES STATES
  useEffect(() => {
    if (idForm !== undefined)
      HubspotFormsRepo.getById<HubspotForm>(idForm).then((res) => {
        setFields(res.formFieldGroups.map((f) => f.fields).flat());
      });
  }, [idForm]);

  // const fields = route?.params?.fields;

  // User infos
  const userInfos: UserState = useAppSelector((state) => state.userInfos);
  const idUser: string | null = userInfos._id;
  const dispatcher = useAppDispatch();

  // FIELDS ARRIVED
  const fieldsFiltered: formFieldCast[] = fields?.map((field: hubspotField) => {
    return {
      hidden: field.hidden,
      name: field.name,
      type: field.fieldType,
      label: field.label?.replace(/<[^>]*>?/gm, ""), // Field type WYSIWYG in Hubspot, remove html tags
      isRequired: field.required,
      placeholder: field.placeholder?.replace(/<[^>]*>?/gm, ""), // Field type WYSIWYG in Hubspot, remove html tags
      defaultValue: field.defaultValue,
      options: field.options,
      objectTypeId: field.objectTypeId,
    };
  });

  const colorTheme = useContext(ThemeContext);

  // FONCTION DE DONNÉES
  // Pop up states
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupCallback, setPopupCallback] = useState<() => void>(() => {});
  const [popupIsError, setPopupIsError] = useState<boolean>(false);

  // Envoie du formulaire
  const sendForm = (field: any): void => {
    const newAnswer = new Answer();
    newAnswer.form = idForm;
    const hiddenFields = fields
      .filter((fi) => fi.hidden)
      .map((fi) => ({
        [fi.name]:
          fi.defaultValue !== ""
            ? fi.defaultValue
            : fi.selectedOptions.length > 1
            ? fi.selectedOptions
            : fi.selectedOptions[0],
      }))
      .reduce(function (result, item) {
        const key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
      }, {});

    const addHidden = { ...field, ...hiddenFields };
    newAnswer.generateHubspotAnswer(addHidden, fields);

    const manageResponse = (resp: {
      inlineMessage?: string;
      redirectUri?: string;
    }): void => {
      if ((resp?.inlineMessage ?? resp?.redirectUri) != null) {
        setPopupMessage("Formulaire enregistré !");
        setPopupCallback(() => () => {
          dispatcher(
            updateUserInfos({
              stats: {
                ...(userInfos.stats ?? {
                  nb_events: 0,
                  next_events: 0,
                  level: 0,
                }),
                nb_forms: (userInfos.stats?.nb_forms ?? 0) + 1,
              },
            })
          );
          router.navigate("/(app)/(tabs)/list-form");
          // navigation.navigate("Formulaires");
        });
        setShowPopup(true);
        setPopupIsError(false);
      } else {
        setPopupMessage(
          "Erreur d'enregistrement ! Envoyer de nouveau dans quelques minutes."
        );
        setPopupCallback(() => () => {}); // Logique de redirection ou de callback
        setShowPopup(true);
        setPopupIsError(true);
      }
    };

    if (idUser != null) {
      newAnswer.ambassador = idUser;
      void newAnswer.save().then(manageResponse);
    } else {
      const askForMail = (firstAsk: boolean = false): void => {
        Alert.prompt(
          "Utilisateur non connecté",
          (firstAsk ? "" : "E-mail non valide. ") +
            "Veuillez renseigner l'e-mail de l'ambassador.",
          [
            {
              text: "OK",
              onPress: (newValue: string | undefined) => {
                if (newValue?.match(/^[a-z-]+\.[a-z-]+@next-u\.fr$/) != null) {
                  newAnswer.ambassador = newValue ?? null;
                  void newAnswer.save().then(manageResponse);
                } else {
                  askForMail();
                }
              },
            },
          ]
        );
      };

      askForMail(true);
    }
  };

  const [selectsOpen, setSelectOpen] = useState<boolean[]>([]);

  // Form Controller
  const { handleSubmit, control, formState, trigger } = useForm();
  const isFormValid = formState.isValid;

  // Regex preset
  const nameRegex = /^[a-zA-Z]+$/;

  // Déterminer l'expression régulière en fonction du type venant de field.name
  function getRegexPattern(fieldName: string): {
    pattern: RegExp;
    message: string;
  } {
    switch (fieldName) {
      case "phoneNumber":
        return { pattern: phoneRegex.pattern, message: "Numéro invalide" };
      case "email":
        return { pattern: emailRegex.pattern, message: "Email invalide" };
      case "name":
        return { pattern: nameRegex, message: "Nom invalide" };
      default:
        // Par défaut, expression régulière générique (aucune vérification)
        return { pattern: /^.*$/, message: "" };
    }
  }

  function isEmpty(value: string): boolean {
    return value === "" || value === null || value.length === 0;
  }

  function generateInput(inputField: formFieldCast): React.JSX.Element | null {
    switch (inputField.type) {
      case "select":
        selectsOpen[inputField.name] =
          selectsOpen[inputField.name] === undefined
            ? false
            : selectsOpen[inputField.name];
        return (
          <Controller
            key={"controller_" + inputField.name}
            control={control}
            render={({ field }) => {
              return (
                <View
                  style={{ zIndex: selectsOpen[inputField.name] ? 1000 : 0 }}
                >
                  <LabelTemplate
                    name={decodeHTML(inputField.label)}
                    required={inputField.isRequired}
                  />
                  <DropDownTemplate
                    modalTitle={inputField.label}
                    placeholder={decodeHTML(inputField.placeholder)}
                    open={selectsOpen[inputField.name]}
                    value={field.value}
                    items={inputField.options}
                    setOpen={(newVal: SetStateAction<boolean>) => {
                      Object.keys(selectsOpen).forEach(function (key, value) {
                        selectsOpen[key] = false;
                      });
                      setSelectOpen({
                        ...selectsOpen,
                        [inputField.name]: newVal as boolean,
                      });
                    }}
                    setValue={(value) => {
                      field.onChange(value);
                    }}
                  />
                </View>
              );
            }}
            name={inputField.name}
            rules={{
              required: inputField.isRequired,
            }}
            defaultValue={inputField.defaultValue}
          />
        );
      case "text":
        return (
          <Controller
            key={"controller_" + inputField.name}
            control={control}
            render={({ field }) => {
              return (
                <>
                  <LabelTemplate
                    name={decodeHTML(inputField.label)}
                    required={inputField.isRequired}
                  />
                  <InputTemplate
                    value={field.value}
                    placeholder={decodeHTML(inputField.placeholder)}
                    onChangeText={(newVal) => {
                      field.onChange(newVal);
                      void trigger();
                    }}
                    secureTextEntry={false}
                    multiline={false}
                    regex={getRegexPattern(inputField.name).pattern}
                  />
                  {formState.errors[inputField.name] != null && (
                    <ErrorMessageTemplate
                      errors={formState?.errors?.[inputField.name]}
                    />
                  )}
                </>
              );
            }}
            name={inputField.name}
            rules={{
              required: inputField.isRequired,
              pattern: {
                value: getRegexPattern(inputField.name).pattern,
                message: getRegexPattern(inputField.name).message,
              },
            }}
            defaultValue={
              !isEmpty(inputField.defaultValue)
                ? inputField.defaultValue
                : inputField.name === "amb"
                ? `${userInfos.firstname} ${userInfos.lastname}`
                : ""
            }
          />
        );
      case "textarea":
        return (
          <Controller
            key={"controller_" + inputField.name}
            control={control}
            render={({ field }) => {
              return (
                <>
                  <LabelTemplate
                    name={decodeHTML(inputField.label)}
                    required={inputField.isRequired}
                  />
                  <InputTemplate
                    value={field.value}
                    placeholder={decodeHTML(inputField.placeholder)}
                    onChangeText={field.onChange}
                    secureTextEntry={false}
                    numberOfLines={5}
                    multiline={true}
                  />
                </>
              );
            }}
            name={inputField.name}
            rules={{
              required: inputField.isRequired,
            }}
            defaultValue={inputField.defaultValue}
          />
        );
      case "booleancheckbox":
        return (
          <Controller
            key={"controller_" + inputField.name}
            control={control}
            render={({ field }) => {
              return (
                <View style={styles.checkboxContainer}>
                  <LabelTemplate
                    name={decodeHTML(inputField.label)}
                    required={inputField.isRequired}
                  />
                  <Checkbox
                    color={colorTheme?.colors.primary}
                    style={[styles.checkbox]}
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </View>
              );
            }}
            name={inputField.name}
            rules={{
              required: inputField.isRequired,
            }}
            defaultValue={inputField.defaultValue}
          />
        );
      case "date":
        return (
          <Controller
            key={"controller_" + inputField.name}
            control={control}
            render={({ field }) => {
              return (
                <>
                  <LabelTemplate
                    name={decodeHTML(inputField.label)}
                    required={inputField.isRequired}
                  />
                  <DateTimePickerTemplate
                    date={field.value}
                    setDate={field.onChange}
                  />
                </>
              );
            }}
            name={inputField.name}
            rules={{
              required: inputField.isRequired,
            }}
            defaultValue={inputField.defaultValue}
          />
        );
      case "phonenumber":
        return (
          <Controller
            key={"controller_" + inputField.name}
            control={control}
            render={({ field }) => {
              return (
                <>
                  <LabelTemplate
                    name={decodeHTML(inputField.label)}
                    required={inputField.isRequired}
                  />
                  <InputTemplate
                    value={field.value}
                    placeholder={decodeHTML(inputField.placeholder)}
                    onChangeText={(newVal) => {
                      field.onChange(newVal);
                      void trigger();
                    }}
                    secureTextEntry={false}
                    multiline={false}
                    regex={phoneRegex.pattern}
                  />
                  {formState.errors[inputField.name] != null && (
                    <ErrorMessageTemplate
                      errors={formState?.errors?.[inputField.name]}
                    />
                  )}
                </>
              );
            }}
            name={inputField.name}
            rules={{
              required: inputField.isRequired,
              pattern: {
                value: phoneRegex.pattern,
                message: "Le numéro de téléphone n'est pas valide.",
              },
            }}
            defaultValue={inputField.defaultValue}
          />
        );
      default:
        return null;
    }
  }

  function generateForm(): any {
    return (
      <>
        {/* DROPDOWN */}
        <View style={styles.formContainer}>
          {fieldsFiltered.map((event) => {
            if (!event.hidden) {
              return generateInput(event);
            }
            return null;
          })}
        </View>
      </>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={[
        styles.keyBoardContainer,
        {
          backgroundColor:
            colorTheme?.isDark ?? false
              ? colors.backgroundDark
              : colors.backgroundDefault,
        },
      ]}
    >
      {showPopup && (
        <>
          <PopupConfirm
            message={popupMessage}
            onConfirm={() => {
              setShowPopup(false);
              popupCallback();
            }}
            visible={showPopup}
            isError={popupIsError}
            closeTimer={10000}
          />
        </>
      )}
      <ScrollView
        style={[
          styles.scrollContainer,
          {
            backgroundColor:
              colorTheme?.isDark ?? false
                ? colors.backgroundDark
                : colors.backgroundDefault,
          },
        ]}
      >
        {generateForm()}
        <TouchableOpacity
          disabled={!isFormValid}
          style={[
            styles.button,
            {
              backgroundColor: isFormValid
                ? colorTheme?.colors.primary
                : colorTheme?.colors.primaryExtraLight,
            },
          ]}
          onPress={handleSubmit(sendForm, (err) => console.error(err))}
        >
          <Text style={styles.text}>Envoyer</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

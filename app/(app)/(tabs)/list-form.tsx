import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Text, View } from "@/components/Themed";
import CardForm from "@/components/CardForm";
import { colors } from "@/config/styles/01-settings/_colors";
import { Events } from "@/hooks/API/Repositories/Events";
import { type Event as Evenement } from "@/hooks/API/ObjectTypes/Event";
import { type Form } from "@/hooks/API/ObjectTypes/Form";
import { Forms } from "@/hooks/API/Repositories/Forms";
import { ThemeContext } from "@/hooks/useColorScheme";
// import TooltipWrapper from "@/components/WalkthroughtBlocks/TooltipWrapper";
import styles from "@/styles/tabs/ListFormStyle";
import { router } from "expo-router";

// API
const EventRepo = new Events();
const FormsRepo = new Forms();
/* Local data */
const toolTipsLabel = {
  nextEventLabel:
    "Ici, tu trouveras les événements disponibles pour ton inscription. Si tu es déjà inscrit à un événement, les détails du prochain événement auquel tu participeras s'afficheront également.",
  AmbassadorStatsLabel: "Test2",
};

export default function ListFormScreen(): ReactNode {
  DropDownPicker.setLanguage("FR");
  DropDownPicker.addTranslation("FR", {
    PLACEHOLDER: "Sélectionnez un élément",
    SEARCH_PLACEHOLDER: "Chercher un formulaire...",
    SELECTED_ITEMS_COUNT_TEXT: {
      1: "Un formulaire sélectionné",
      n: "{count} formulaires sélectionné",
    },
    NOTHING_TO_SHOW: "Aucun formulaire n'est actuellement disponible",
  });

  function redirection(guidForm: string, title: string): void {
    console.log("title", title);
    router.push({
      pathname: `/(app)/forms/${guidForm}`,
      params: { title },
    });
  }

  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    let mounted = true;
    // RECUPERATION DE TOUS LES FORMULAIRES
    refreshForms();
    // RECUPERATION DE TOUS LES EVENEMENTS
    refreshEvents();

    return () => {
      mounted = false;
    };
  }, []);

  const refreshForms = (): void => {
    void FormsRepo.getWithParams("today").then((resp: Form[]) => {
      setForms(resp);
    });
  };

  const refreshEvents = (): void => {
    void EventRepo.getWithParams("today").then((res) => {
      setEvenements(
        res.map((ev: Evenement) => {
          return { label: ev.name, value: ev._id };
        })
      );
    });
  };

  // DONNEES DANS LE DROPDOWN
  const [evenements, setEvenements] = useState([]);

  useEffect(() => {
    setItems([...evenements]);
  }, [evenements]);

  // VARIABLES  pour le dropdown
  const [items, setItems] = useState<Array<{ label: string; value: string }>>(
    []
  );
  const [valueSelected, setValueSelected] = useState<string[]>(
    items.map((value: { label: string; value: string }) => value.value)
  );
  const [open, setOpen] = useState(false);
  // REFRESH
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refreshForms();
    refreshEvents();
    setRefreshing(false);
  }, []);

  // GENERATION DE BADGES DE COULEUR
  // THEME COLOR
  const themeColor = useContext(ThemeContext);

  function getRandomColor(): string {
    if (themeColor?.colors) {
      const colorKeys = Object.keys(themeColor?.colors);
      const randomColorKey =
        colorKeys[Math.floor(Math.random() * colorKeys.length)];
      return themeColor.colors[
        randomColorKey as keyof typeof themeColor.colors
      ];
    }
    return "#1c93fa";
  }

  const randomPrimaryColor = getRandomColor();

  const DynamicComponent = open ? TouchableWithoutFeedback : View;

  return (
    <DynamicComponent
      onPress={() => {
        setOpen(false);
      }}
    >
      <View style={styles.globalContainer}>
        <View style={{ backgroundColor: "transparent", zIndex: 10 }}>
          <Text bold style={styles.title}>
            Formulaires disponibles
          </Text>
          {/*<TooltipWrapper tooltipContent={toolTipsLabel.nextEventLabel} showChildInTooltip={true}>*/}
          <DropDownPicker
            searchable={true}
            modalTitle="Formulaires d'évènement"
            placeholder="Choisir un ou plusieurs évènements"
            open={open}
            value={valueSelected}
            items={items}
            setOpen={setOpen}
            setValue={setValueSelected}
            setItems={setItems}
            theme={themeColor?.isDark ? "DARK" : "LIGHT"}
            multiple={true}
            mode="BADGE"
            scrollViewProps={{
              decelerationRate: "fast",
            }}
            modalProps={{
              animationType: "slide",
            }}
            badgeDotColors={[...items].map((_) => randomPrimaryColor)}
            listMode="FLATLIST"
            customItemLabelStyle={{
              fontFamily: "Raleway-Regular",
            }}
            textStyle={{
              fontFamily: "Raleway-Regular",
            }}
            searchTextInputStyle={{
              fontFamily: "Raleway-Regular",
            }}
            listChildLabelStyle={{
              fontFamily: "Raleway-Regular",
            }}
            listParentLabelStyle={{
              fontFamily: "Raleway-Regular",
            }}
            listItemLabelStyle={{
              fontFamily: "Raleway-Regular",
            }}
            selectedItemLabelStyle={{
              fontFamily: "Raleway-Regular",
            }}
            listMessageTextStyle={{
              fontFamily: "Raleway-Regular",
              textAlign: "center",
            }}
          />
          {/*</TooltipWrapper>*/}
        </View>
        <View
          style={styles.separator}
          darkColor={`rgba(${colors.white}, 0.1)`}
          lightColor={colors.gray300}
        />
        <ScrollView
          style={styles.secureDisplay}
          nestedScrollEnabled={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={{ flex: 1, backgroundColor: "transparent" }}>
            {forms?.length > 0 ? (
              forms.map((item: Form) =>
                valueSelected.includes(item.evenement?._id ?? "") ? (
                  <CardForm
                    key={item._id}
                    idForm={item._id ?? undefined}
                    nameForm={item.name}
                    nameEvent={item?.evenement?.name}
                    guidForm={item.hubspot_form?._id}
                    redirection={(guidForm) => redirection(guidForm, item.name)}
                  />
                ) : null
              )
            ) : (
              <Text
                darkColor={colors.gray300}
                lightColor={colors.black}
                style={styles.empty}
              >
                Aucun formulaire n'est actuellement disponible
              </Text>
            )}

            {valueSelected?.length === 0 && forms?.length > 0 ? (
              <Text style={styles.empty}>
                Aucun évènement n'a été sélectionné
              </Text>
            ) : null}
          </View>
        </ScrollView>
      </View>
    </DynamicComponent>
  );
}

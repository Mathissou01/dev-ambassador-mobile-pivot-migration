import { type SetStateAction } from "react";
import { Alert } from "react-native";
import {
  type AmbassadorData,
  type PasswordData,
  type ErrorPasswordData,
  type HelpData,
} from "../../types";

export const handleSubmitInfos = (
  fields: AmbassadorData,
  schoolsSelected: { label: string; value: string }
): void => {
  const nameRegex = /^[a-zA-Z]+$/;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const phoneRegex =
    /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
  let isValidInfos = true;

  if (
    fields.firstname.trim() === "" ||
    fields.lastname.trim() === "" ||
    fields.email.trim() === "" ||
    fields.tel.trim() === "" ||
    !schoolsSelected
  ) {
    isValidInfos = false;
  }

  if (
    !nameRegex.test(fields.firstname.trim()) ||
    !nameRegex.test(fields.lastname.trim()) ||
    !emailRegex.test(fields.email.trim()) ||
    !phoneRegex.test(fields.tel.trim())
  ) {
    isValidInfos = false;
  }

  if (isValidInfos) {
    Alert.alert("Formulaire complet", "Tous les champs du formulaire sont complet");
  } else {
    Alert.alert(
      "Formulaire incomplet",
      "Un ou plusieurs champs du formulaire n'ont pas été saisi correctement. Veuillez compléter le formulaire.",
      [
        {
          text: "ok",
          onPress: () => {},
          style: "destructive",
        },
      ]
    );
  }
};

export const handleSubmitSecurity = (
  fields: PasswordData,
  error: ErrorPasswordData,
  setError: SetStateAction<PasswordData>
): void => {
  const passwordRegex =
    /^(?=.*[a-zàáâãäåæçèéêëìíîïñòóôõöùúûü])(?=.*[A-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜ])(?=.*\d)(?=.*[@#\$!%\*\?&_:;/\\\+=\-,\?€])[A-Za-zàáâãäåæçèéêëìíîïñòóôõöùúûüÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜ\d@#\$!%\*\?&_:;/\\\+=\-,\?€]{8,}$/;

  let isValidSecurity = true;

  if (fields.oldPassword.trim() === "") {
    isValidSecurity = false;
    setError({
      ...error,
      oldPassword: "L'ancien mot de passe est requis",
    });
  }

  if (fields.newPassword.trim() !== fields.verifyPassword.trim()) {
    isValidSecurity = false;
    setError({
      ...error,
      verifyPassword: "Les mots de passe ne correspondent pas",
    });
  }

  if (
    !passwordRegex.test(fields.newPassword.trim()) ||
    passwordRegex.test(fields.verifyPassword.trim())
  ) {
    isValidSecurity = false;
    setError({
      ...error,
      newPassword:
        "Le nouveau mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial et 8 caractères minimum",
    });
  }

  if (isValidSecurity) {
    Alert.alert("Mot de passe modifié avec succès!");
  }
};

export const handleSubmitHelp = (
  fields: HelpData,
  messagesTypeSelected: { label: string; value: string } | undefined
) => {
  const inputRegex = /^[A-Za-z0-9.]{5,1000}$/;
  let isValidHelp = true;

  if (
    fields.subject.trim() === "" ||
    fields.messageType.trim() === "" ||
    messagesTypeSelected == null ||
    !inputRegex.test(fields.subject.trim()) ||
    !inputRegex.test(fields.messageType.trim())
  ) {
    isValidHelp = false;
  }

  if (isValidHelp) {
    Alert.alert("Formulaire complet", "Tous les champs du formulaire sont complet");
  } else {
    Alert.alert(
      "Formulaire incomplet",
      "Un ou plusieurs champs du formulaire n'ont pas été saisi correctement. Veuillez compléter le formulaire.",
      [
        {
          text: "ok",
          onPress: () => {},
          style: "destructive",
        },
      ]
    );
  }
};

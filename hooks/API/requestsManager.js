// API CALL
import { fetchAPIwithToken } from "./index";

// STORE
import { store } from "../../redux";

// CONSTANTES
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API_URL = `${BASE_URL}api/`;

const checkObjectType = (objectType) => {
  return true;
};

// APPEL API GET
export async function getAPI({ objectType, options = "", ...args }) {
  if (checkObjectType(objectType))
    try {
      const result = await fetchAPIwithToken(
        API_URL + objectType + options,
        `Ambassador ${store.getState().userInfos.accessToken}`
      );

      return result?.result ?? [];
    } catch (error) {
      if (error.response) {
        // Une réponse a été reçue, mais elle contient une erreur de statut
        console.error("Réponse de l'API avec erreur de statut :", error.response.status);
        console.error("Données de l'erreur :", error.response.data);
      } else if (error.request) {
        // La requête a été effectuée, mais aucune réponse n'a été reçue
        console.error("La requête n'a reçu aucune réponse :", error.request);
      } else {
        // Une erreur s'est produite lors de la préparation de la requête
        console.error("Erreur lors de la préparation de la requête :", error.message);
      }
      return {
        error: true,
        message: "Une erreur est survenue lors de l'accès à l'API.",
      };
    }
  return {
    error: true,
    message: "Le type d'objet demandé n'existe pas !",
  };
}

// APPEL API POST
export async function postAPI({ objectType, dataToTransfert, options = "", ...args }) {
  if (checkObjectType(objectType))
    try {
      const result = await fetchAPIwithToken(
        API_URL + objectType + options,
        `Ambassador ${store.getState().userInfos.accessToken}`,
        "POST",
        dataToTransfert
      );
      return result?.result;
    } catch (error) {
      if (error.response) {
        // Une réponse a été reçue, mais elle contient une erreur de statut
        console.error("Réponse de l'API avec erreur de statut :", error.response.status);
        console.error("Données de l'erreur :", error.response.data);
      } else if (error.request) {
        // La requête a été effectuée, mais aucune réponse n'a été reçue
        console.error("La requête n'a reçu aucune réponse :", error.request);
      } else {
        // Une erreur s'est produite lors de la préparation de la requête
        console.error("Erreur lors de la préparation de la requête :", error.message);
      }
      return {
        error: true,
        message: "Une erreur est survenue lors de l'accès à l'API.",
      };
    }
}

// APPEL API PUT
export async function putAPI({
  objectType,
  idToModify = "",
  options = "",
  dataToTransfert,
  ...args
}) {
  if (checkObjectType(objectType))
    try {
      const result = await fetchAPIwithToken(
        API_URL +
          objectType +
          (idToModify !== "" ? "/" + idToModify : "") +
          (options !== "" ? "/" + options : ""),
        `Ambassador ${store.getState().userInfos.accessToken}`,
        "PUT",
        dataToTransfert
      );
      return result?.result;
    } catch (error) {
      if (error.response) {
        // Une réponse a été reçue, mais elle contient une erreur de statut
        console.error("Réponse de l'API avec erreur de statut :", error.response.status);
        console.error("Données de l'erreur :", error.response.data);
      } else if (error.request) {
        // La requête a été effectuée, mais aucune réponse n'a été reçue
        console.error("La requête n'a reçu aucune réponse :", error.request);
      } else {
        // Une erreur s'est produite lors de la préparation de la requête
        console.error("Erreur lors de la préparation de la requête :", error.message);
      }
      return {
        error: true,
        message: "Une erreur est survenue lors de l'accès à l'API.",
      };
    }
}

// APPEL API DELETE
export async function deleteAPI({ objectType, idToDelete, ...args }) {
  if (checkObjectType(objectType))
    try {
      const result = await fetchAPIwithToken(
        API_URL + objectType + "/" + idToDelete,
        `Ambassador ${store.getState().userInfos.accessToken}`,
        "DELETE"
      );
      return result?.result;
    } catch (error) {
      if (error.response) {
        // Une réponse a été reçue, mais elle contient une erreur de statut
        console.error("Réponse de l'API avec erreur de statut :", error.response.status);
        console.error("Données de l'erreur :", error.response.data);
      } else if (error.request) {
        // La requête a été effectuée, mais aucune réponse n'a été reçue
        console.error("La requête n'a reçu aucune réponse :", error.request);
      } else {
        // Une erreur s'est produite lors de la préparation de la requête
        console.error("Erreur lors de la préparation de la requête :", error.message);
      }
      return {
        error: true,
        message: "Une erreur est survenue lors de l'accès à l'API.",
      };
    }
}

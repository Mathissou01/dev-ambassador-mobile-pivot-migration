import axios from "axios";
import {store} from "@/redux";
import {updateUserInfos, updateUserWithLocalStorage} from "@/redux/UserInfos/UserInfosSlice";
import {Ambassador, type AmbassadorType} from "./API/ObjectTypes/Ambassador";

interface apiData {
    ok: boolean;
    result: {
        user: AmbassadorType;
        error: string;
    };
    tokens: {
        accessToken: string;
        refreshToken: string;
        permanentToken?: string;
    };
}

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const AUTH_URL = `${BASE_URL}auth/`;

export async function auth(
    username: string,
    password: string,
    withStoreUpdate: boolean = false
): Promise<{ isAuth: boolean; currentUser?: Ambassador }> {
    try {
        const data = {username, password};
        const response: apiData = await axios({
            method: "post",
            url: `${AUTH_URL}login`,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data,
        })
            .then((response: { data: apiData }) => {
                return response.data;
            })
            .catch((error: any) => {
                console.error("ici", error);
                throw new Error(error);
            });

        if (response && response.ok) {
            const newAmbassador = new Ambassador(response.result.user);

            if (withStoreUpdate)
                store.dispatch(
                    updateUserWithLocalStorage({
                        ...newAmbassador.json,
                        accessToken: response.tokens.accessToken,
                        refreshToken: response.tokens.refreshToken,
                        permanentToken: response.tokens.permanentToken,
                    })
                );
            else
                store.dispatch(
                    updateUserInfos({
                        ...newAmbassador.json,
                        accessToken: response.tokens.accessToken,
                        refreshToken: response.tokens.refreshToken,
                        permanentToken: response.tokens.permanentToken,
                    })
                );

            return {isAuth: true, currentUser: newAmbassador};
        } else {
            console.error(response.result?.error);
            return {isAuth: false};
        }
    } catch (error) {
        return {isAuth: false};
    }
}

export async function autoAuth(
    permanentToken: string,
    userId: string
): Promise<{
    isAuth: boolean;
    currentUser?: Ambassador;
}> {
    try {
        const response: apiData = await axios({
            method: "post",
            url: `${AUTH_URL}login`,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data: {permanentToken, userId},
        })
            .then((response: { data: apiData }) => {
                return response.data;
            })
            .catch((error: any) => {
                throw new Error(error);
            });

        if (response && response.ok) {
            const newAmbassador = new Ambassador(response.result.user);

            store.dispatch(
                updateUserWithLocalStorage({
                    ...newAmbassador.json,
                    accessToken: response.tokens.accessToken,
                    refreshToken: response.tokens.refreshToken,
                    permanentToken: response.tokens.permanentToken,
                })
            );

            return {isAuth: true, currentUser: newAmbassador};
        } else {
            console.error(response.result?.error);
            return {isAuth: false};
        }
    } catch (error) {
        console.error(error);
        return {isAuth: false};
    }
}

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ForAxiosDefs } from "../../commonTypes";

interface AxiosProps {
    path: string;
    payload: {};
    contentType?: string;
    params?: {};
    method: ForAxiosDefs;
    userKey?: string;
}

interface Config extends AxiosRequestConfig {
    contentType?: string;
    data: {};
    json: boolean;
}

interface ReturnAxiosDef extends AxiosResponse {
    data: any;
}

function LocalErrorHandler(message: string | {}) {
    return message;
}

interface HeaderType {
    Authorization?: string;
    "Content-Type": string;
    userKey?: string;
}

export const axiosCall = async (props: AxiosProps) => {
    const headers: HeaderType = {
        "Content-Type": props.contentType || "application/json",
        userKey: props.userKey || "",
    };

    const url = `${process.env.BASE_URL}${props.path}`;

    const axiosData: Config = {
        method: props.method,
        data: props.payload,
        params: props.params ?? {},
        json: true,
        url,
        headers,
    };

    try {
        return await axios(axiosData);
    } catch (error) {
        if (error.response) {
            const errResponse = error.response.data;

            throw LocalErrorHandler(errResponse);
        }
    }
};

import { ForAxiosDefs } from "../../commonTypes";

interface MakeCallDef {
    dispatch: any;
    requestFunc: (props: {
        path: string;
        payload: {};
        method: ForAxiosDefs;
        params?: {};
        userKey?: string;
    }) => void;
    method: ForAxiosDefs;
    path: string;
    payload: {};
    params?: {};
    userKey?: string;
}

export const useActionCall = async (props: MakeCallDef) => {
    await props.dispatch(
        props.requestFunc({
            path: props.path,
            method: props.method,
            payload: props.payload,
            params: props.params ?? {},
            userKey: props.userKey ?? "",
        })
    );
};

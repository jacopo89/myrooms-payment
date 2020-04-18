import {BackendClient} from "./axios-client";
import {useCreateHook} from "./useHook";

export function  useLogin() {

    const backendClient = BackendClient();
    return useCreateHook(backendClient,'/login','post',null);
}

export function  useRegister() {
    const backendClient = BackendClient();
    return useCreateHook(backendClient,'/register','post',null);
}

export function  usePasswordRecovery() {
    const backendClient = BackendClient();
    return useCreateHook(backendClient,'/recovery','post',false);
}

export function  useChangePassword() {
    const backendClient = BackendClient();
    return useCreateHook(backendClient,'/passwordchange','post',false);
}


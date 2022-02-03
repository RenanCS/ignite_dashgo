
import { UserCredencials } from "src/contexts/AuthContext/interface";
import { apiAuthentication } from "src/services/axios/autentication";
import { CredencialResponse } from "../authenticationUser/interface";

export const meUser = async (): Promise<Partial<UserCredencials>> => {

    const { data } = await apiAuthentication.get<CredencialResponse>(`/me`);

    const credencial: Partial<UserCredencials> = {
        permissions: data.permissions,
        roles: data.roles
    }

    return credencial;
}
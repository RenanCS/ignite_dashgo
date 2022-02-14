
import { AxiosInstance } from "axios";
import { UserCredencials } from "src/contexts/AuthContext/interface";
import { CredencialResponse } from "../authenticationUser/interface";

export const meUser = async (apiClient: AxiosInstance): Promise<Partial<UserCredencials>> => {
    try {
        const { data } = await apiClient.get<CredencialResponse>(`/me`);

        const credencial: Partial<UserCredencials> = {
            permissions: data.permissions,
            roles: data.roles
        }

        return credencial;
    } catch (err) {
        return null;
    }

}
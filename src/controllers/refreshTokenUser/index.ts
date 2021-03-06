import { setCookie } from "nookies";
import { UserCredencials } from "src/contexts/AuthContext/interface";
import { apiAuthentication } from "src/services/axios/apiClient";
import { Library } from "src/util/readOnly";
import { CredencialResponse } from "../authenticationUser/interface";


export const refreshTokenUser = async (ctx = undefined, refreshToken: string): Promise<string> => {
    try {
        const { data } = await apiAuthentication.post<CredencialResponse>(`/refresh`, {
            refreshToken
        });

        const credencial: Partial<UserCredencials> = {
            permissions: data.permissions,
            roles: data.roles
        }

        setCookie(ctx, Library.DASHGOTOKEN, data.token, { maxAge: Library.TIMETOLIVECOOKIE, path: "/" });
        setCookie(ctx, Library.DASHGOREFRESHTOKEN, data.refreshToken, { maxAge: Library.TIMETOLIVECOOKIE, path: "/" });

        apiAuthentication.defaults.headers['Authorization'] = `Bearer ${data.token}`;

        return data.token;

    } catch (err) {
        console.log(err);
    }

    return null;

}
import { SignInCredentials, UserCredencials } from "src/contexts/AuthContext/interface";
import { apiAuthentication } from "src/services/axios/autentication";
import { CredencialResponse } from "./interface";
import { setCookie } from "nookies";
import { Library } from "src/util/readOnly";

export const authenticationUser = async ({ email, password }: SignInCredentials): Promise<UserCredencials> => {
    try {
        const { data } = await apiAuthentication.post<CredencialResponse>(`/sessions`, {
            email,
            password
        });

        const credencial: UserCredencials = {
            email,
            permissions: data.permissions,
            roles: data.roles
        }

        setCookie(undefined, Library.DASHGOTOKEN, data.token, { maxAge: Library.TIMETOLIVECOOKIE, path: "/" });
        setCookie(undefined, Library.DASHGOREFRESHTOKEN, data.refreshToken, { maxAge: Library.TIMETOLIVECOOKIE, path: "/" });

        apiAuthentication.defaults.headers['Authorization'] = `Bearer ${data.token}`;

        return credencial;

    } catch (err) {
        console.log(err);
    }

    return null;

}
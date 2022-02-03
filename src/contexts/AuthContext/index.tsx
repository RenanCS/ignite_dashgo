import { parseCookies } from "nookies";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { authenticationUser } from "src/controllers/authenticationUser";
import { meUser } from "src/controllers/meUser";
import { AuthContextData, AuthProviderProps, SignInCredentials, UserCredencials } from "./interface";

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [userAuthenticated, setUserAuthenticated] = useState<UserCredencials>();

    const isAuthenticated = !!userAuthenticated;

    const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
        const authenticated = await authenticationUser({ email, password });

        if (!!authenticated) {
            setUserAuthenticated(authenticated);
        }

        return Promise.resolve(!!authenticated);
    }, [])


    const getMeInfo = useCallback(async () => {
        const { 'dashgo.token': token } = parseCookies();

        if (token) {

            const authenticated = await meUser();

            if (!!authenticated) {

                const { permissions, roles } = authenticated;

                setUserAuthenticated((prevState) => ({
                    ...prevState,
                    permissions,
                    roles
                }));
            }
        }
    }, [])

    return (
        <AuthContext.Provider value={{ signIn, getMeInfo, isAuthenticated, userAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
} 
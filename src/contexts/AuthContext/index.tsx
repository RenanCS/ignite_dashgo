import Router from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { authenticationUser } from "src/controllers/authenticationUser";
import { meUser } from "src/controllers/meUser";
import { Library } from "src/util/readOnly";
import { AuthContextData, AuthProviderProps, SignInCredentials, UserCredencials } from "./interface";
import { apiAuthentication } from "src/services/axios/apiClient";

let authChannel: BroadcastChannel;

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

    const signOut = useCallback(() => {
        authChannel = new BroadcastChannel('auth');

        destroyCookie(undefined, Library.DASHGOTOKEN);
        destroyCookie(undefined, Library.DASHGOREFRESHTOKEN);
        authChannel.postMessage('signOut');
        Router.push('/');
    }, [])


    const getMeInfo = useCallback(async () => {
        const { 'dashgo.token': token } = parseCookies();

        if (token) {

            const authenticated = await meUser(apiAuthentication);

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

    useEffect(() => {
        getMeInfo();
    }, [getMeInfo])


    useEffect(() => {
        authChannel = new BroadcastChannel('auth');

        authChannel.onmessage = (message) => {
            if (message.data === "signOut") {
                signOut();
            }
        }
    }, [signOut])

    return (
        <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, userAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
} 
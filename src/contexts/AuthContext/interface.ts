import { ReactNode } from "react";

export interface SignInCredentials {
    email: string;
    password: string;
}

export interface AuthContextData {
    isAuthenticated: boolean;
    userAuthenticated: UserCredencials;
    signIn(credentials: SignInCredentials): Promise<boolean>;
    getMeInfo(): Promise<void>;
}

export interface AuthProviderProps {
    children: ReactNode;
}

export interface UserCredencials {
    email: string;
    permissions: string[];
    roles: string[]
}
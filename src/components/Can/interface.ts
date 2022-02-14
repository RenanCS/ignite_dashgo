import { ReactNode } from "react";

export interface CanProps {
    children: ReactNode;
    permissions?: string[];
    roles?: string[];
}
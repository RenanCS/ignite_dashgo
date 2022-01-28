import { UseDisclosureReturn } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface MenuDrawerProviderProps {
    children: ReactNode;
}

export interface MenuDrawerContext extends UseDisclosureReturn { }
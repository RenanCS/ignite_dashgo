import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect } from "react";
import { MenuDrawerContext, MenuDrawerProviderProps } from "./interface";


const MenuDrawerContext = createContext({} as MenuDrawerContext);

export const MenuDrawerProiver: React.FC<MenuDrawerProviderProps> = ({ children }) => {

    const disclosure = useDisclosure();
    const { onClose } = disclosure
    const router = useRouter()

    useEffect(() => {
        onClose()
    }, [onClose, router.asPath])

    return (
        <MenuDrawerContext.Provider value={disclosure}>
            {children}
        </MenuDrawerContext.Provider>
    )
}

export const useMenuDrawer = () => useContext(MenuDrawerContext);
import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react";
import { useMenuDrawer } from "src/contexts/MenuDrawerContext";
import { SidebarNav } from "../Sidebar";


export const Menu: React.FC = () => {

    const { isOpen, onClose } = useMenuDrawer();

    const isDrawerSideBar = useBreakpointValue({
        base: true,
        lg: false
    })

    if (isDrawerSideBar) {
        return (
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay>
                    <DrawerContent bg="gray.800" p="4">
                        <DrawerCloseButton mt="6" />
                        <DrawerHeader>Navegação</DrawerHeader>
                        <DrawerBody>
                            <SidebarNav />
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        )
    }

    return (
        <Box as="aside" w="64" mr="8">
            <SidebarNav />
        </Box >
    );
}

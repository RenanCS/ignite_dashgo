import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";


export const SidebarNav: React.FC = () => {
    return (
        <Stack spacing="12" align="flex-start">
            <NavSection title="GERAL">
                <NavLink title="Dashboard" icon={RiDashboardLine} to='/dashboard' />
                <NavLink title="Usuários" icon={RiContactsLine} to='/users' />
            </NavSection>
            <NavSection title="AUTOMAÇÃO">
                <NavLink title="Formulários" icon={RiInputMethodLine} to='/forms' />
                <NavLink title="Automação" icon={RiGitMergeLine} to='/automation' />
            </NavSection>
        </Stack>
    );
}

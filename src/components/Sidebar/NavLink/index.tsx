import { Icon, Link as LinkChakra, Text } from "@chakra-ui/react";
import { ActiveLink } from "src/components/ActiveLink";
import { NavLinkProps } from "./interface";

export const NavLink: React.FC<NavLinkProps> = ({ title, icon, to, ...rest }) => {
    return (
        <ActiveLink href={to} passHref>
            <LinkChakra display="flex" align="center" {...rest}>
                <Icon as={icon} fontSize="20" />
                <Text ml="4" fontWeight="mediu">{title}</Text>
            </LinkChakra>
        </ActiveLink>
    )
}
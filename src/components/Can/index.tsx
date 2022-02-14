import { useCan } from "src/hooks/useCan";
import { CanProps } from "./interface";

export const Can: React.FC<CanProps> = ({ children, permissions = [], roles = [] }) => {
    const useCanSeeComponent = useCan({ permissions, roles });

    if (!useCanSeeComponent) {
        return null;
    }

    return (
        <>
            {children}
        </>
    )
}
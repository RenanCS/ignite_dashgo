import React, { useContext } from "react"
import { AuthContext } from "src/contexts/AuthContext"
import { validateUserPermissions } from "src/util/validateUserPermissions";
import { UseCanParams } from "./interface"

export const useCan = ({ permissions = [], roles = [] }: UseCanParams): Boolean => {

    const { userAuthenticated, isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return false;
    }

    const user = { permissions: userAuthenticated.permissions, roles: userAuthenticated.roles };

    const userHasValidPermissions = validateUserPermissions({ user, permissions, roles });

    return userHasValidPermissions;
}
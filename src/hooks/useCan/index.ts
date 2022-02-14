import React, { useContext } from "react"
import { AuthContext } from "src/contexts/AuthContext"
import { UseCanParams } from "./interface"

export const useCan = ({ permissions = [], roles = [] }: UseCanParams): Boolean => {

    const { userAuthenticated, isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return false;
    }

    if (permissions.length > 0) {
        const hasAllPermissions = permissions.every(permission => {
            return userAuthenticated.permissions.includes(permission);
        });

        if (!hasAllPermissions) {
            return false;
        }
    }

    if (roles.length > 0) {
        const hasAllRoles = roles.some(role => {
            return userAuthenticated.roles.includes(role);
        });

        if (!hasAllRoles) {
            return false;
        }
    }

    return true;
}
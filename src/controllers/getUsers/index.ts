import { api } from "src/services/axios"
import { UserResponse } from "src/services/mirage/interface";

export const getUsers = async (): Promise<UserResponse[]> => {
    const result = await api.get(`/users`);
    return result.data?.users ?? [];
}
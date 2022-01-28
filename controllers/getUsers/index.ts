import { api } from "src/services/axios"
import { User } from "src/services/mirage/interface";

export const getUsers = async (): Promise<User[]> => {
    const result = await api.get<User[]>(`/users`);
    debugger;
    return result.data;
}
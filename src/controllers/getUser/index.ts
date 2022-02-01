import { api } from "src/services/axios";
import { UserResponse } from "src/services/mirage/interface";

export const getUser = async (userId: number): Promise<UserResponse> => {
    const { data } = await api.get<UserResponse>(`/users/${userId}`);
    return data;
}
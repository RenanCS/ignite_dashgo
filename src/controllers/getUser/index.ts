import { api } from "src/services/axios";
import { UserMirage } from "src/services/mirage/interface";

export const getUser = async (userId: number): Promise<UserMirage> => {

    const { data } = await api.get<UserMirage>(`/users/${userId}`);

    return data;
}
import { api } from "src/services/axios";
import { UserPaginationResponse } from "./interface";

export const getUsers = async (page: number): Promise<UserPaginationResponse> => {
    const { data, headers } = await api.get(`/users`, {
        params: {
            page,
        }
    });

    const response: UserPaginationResponse = {
        users: data?.users ?? [],
        totalCount: Number(headers['x-total-count'])
    }

    return response;
}
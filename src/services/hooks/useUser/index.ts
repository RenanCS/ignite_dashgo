import { useQuery, UseQueryResult } from "react-query";
import { getUsers } from "src/controllers/getUsers";
import { UserMirage } from "src/services/mirage/interface";
import { FormatDate } from "src/util/formatDate";
import { Library } from "src/util/readOnly";
import { User, UserPagination } from "./interface";

export const factoryUser = async (page: number): Promise<UserPagination> => {
    const { users, totalCount } = await getUsers(page);

    const usersFormated: User[] = users.map(user => {
        return {
            id: user?.id,
            name: user.name,
            email: user.email,
            createdAt: FormatDate(user.created_at)
        }
    });

    const response: UserPagination = {
        users: usersFormated,
        totalCount: totalCount
    }

    return response;
}

export const useUsers = (page: number) => {
    return useQuery<UserPagination>(
        [Library.QUERYKEY, { page }],
        () => factoryUser(page),
    );
}
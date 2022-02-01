import { useQuery } from "react-query";
import { getUsers } from "src/controllers/getUsers";
import { User, UserPagination } from "src/pages/users/interface";
import { FormatDate } from "src/util/formatDate";

const QUERYKEY = 'users';

const mappingUser = async (page: number): Promise<UserPagination> => {
    const { users, totalCount } = await getUsers(page);

    const usersFormated: User[] = users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: FormatDate(user.createdAt)
        }
    });

    const response: UserPagination = {
        users: usersFormated,
        totalCount: totalCount
    }

    return response;
}

export const useUsers = (page: number) => {
    return useQuery<UserPagination>([QUERYKEY, { page }], async () => {
        return await mappingUser(page);
    });
}
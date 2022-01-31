import { useQuery } from "react-query";
import { getUsers } from "src/controllers/getUsers";
import { User } from "src/pages/users/interface";
import { FormatDate } from "src/util/formatDate";

const QUERYKEY = 'users';

const mappingUser = async () => {
    const userResponse = await getUsers();

    const usersFormated: User[] = userResponse.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: FormatDate(user.createdAt)
        }
    });

    return usersFormated;
}

export const useUsers = () => {
    return useQuery<User[]>(QUERYKEY, async () => {
        return await mappingUser();
    });
}
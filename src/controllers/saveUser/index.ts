import { api } from "src/services/axios";
import { UserRequest, CreateUserFormData } from "./interface";

export const saveUser = async (user: CreateUserFormData): Promise<CreateUserFormData> => {
    const userRequest: UserRequest = {
        email: user.email,
        name: user.name,
        password: user.password,
        password_confirmation: user.password_confirmation,
        createdAt: new Date().toLocaleDateString(),
    }

    const { data } = await api.post('users', { user: userRequest });

    return data;
}
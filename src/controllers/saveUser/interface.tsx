export interface UserRequest {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    createdAt: string;
}


export interface CreateUserFormData {
    id: number;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
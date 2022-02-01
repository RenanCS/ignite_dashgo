export interface User {
    name: string;
    email: string;
    createdAt: string;
    id: number
}

export interface UserPagination {
    users: User[]
    totalCount: number;
}

export interface CreateUserFormData {
    id: number;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

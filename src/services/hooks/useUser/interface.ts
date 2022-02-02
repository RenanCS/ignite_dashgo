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



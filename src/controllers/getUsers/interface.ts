import { UserMirage } from "src/services/mirage/interface";
export interface UserPaginationResponse {
    users: UserMirage[],
    totalCount: number
}
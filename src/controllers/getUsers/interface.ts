import { UserResponse } from "src/services/mirage/interface";
export interface UserPaginationResponse {
    users: UserResponse[],
    totalCount: number
}
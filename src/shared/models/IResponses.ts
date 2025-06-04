import type {IUser} from "../../entities/auth/IUser.ts";

export interface IAuthResponse {
    token: string,
    data: IUser
}
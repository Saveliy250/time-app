import type {IUser} from "entities/user/IUser.ts";

export interface IAuthResponse {
    token: string,
    data: IUser
}
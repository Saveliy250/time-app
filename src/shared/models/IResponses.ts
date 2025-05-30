import type {IUser} from "./IUser.ts";

export interface IAuthResponse {
    token: string,
    data: IUser
}
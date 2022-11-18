export type UserLoginByPasswordReq = {
    userId: string;
    password: string;
}
export type UserLoginResp = {
    token: string;
    wsAddress: string;
}

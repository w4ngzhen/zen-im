export type UserLoginByPasswordReq = {
    userId: string;
    userPassword: string;
}
export type UserLoginResp = {
    token: string;
    wsAddress: string;
}

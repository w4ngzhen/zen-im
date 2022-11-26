export const encodeToToken = (userId: string): string => {
    return `token_${userId}`;
}

export const decodeFromToken = (token: string) => {
    return token.replace('token_', '')
}

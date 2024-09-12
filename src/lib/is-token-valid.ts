export const isTokenValid = (token: string): boolean => {
    const tokens = token.split('.');
    if (tokens.length <= 1) throw new Error('Is not a valid token');
    const payload = JSON.parse(atob(tokens[1]));
    return payload.exp > Date.now() / 1000;
}

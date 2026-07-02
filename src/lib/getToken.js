
import { authClient } from './auth-client';

export const getJwt = async () => {
    const token = await authClient.getToken();

    return token.token;
};

export default getJwt;



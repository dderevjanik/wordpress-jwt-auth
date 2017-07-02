import axios from 'axios';

const JWT_ENDPOINT = '/wp-json/jwt-auth/v1/';

/**
 * JWT Response after successfully authenticated user
 */
export interface JWT {
    /**
     * JWT Token used in every request
     */
    token: string;

    /**
     * User email
     */
    user_email: string;

    /**
     * User full name
     */
    user_nicename: string;

    /**
     * Displayed username
     */
    user_display_name: string;
}

/**
 * Authenticate user
 * @param host - hot URL
 * @param username - user's name used to login
 * @param password - user's password used to login
 * @throws {CannotAuthenticate}
 */
export const authenticate = async (host: string, username: string, password: string) => {
    const endPoint = host + JWT_ENDPOINT;
    const response = await axios.post(endPoint + 'token', { username, password });
    if (!response.data.token) {
        throw new Error('CannotAuthenticate: bad username or password');
    }

    const jwt = response.data as JWT;
    return {
        ...jwt,

        /**
         * Validate token
         * @returns true if token is successfully validated
         */
        validate: async (): Promise<boolean> => {
            const authHeader = { headers: { Authorization: 'bearer ' + jwt.token } };
            const valResponse = await axios.post(endPoint + 'validate', {}, authHeader);
            if (valResponse.status === 200) {
                return true;
            }
            return false;
        },
    };
};

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
 * @param host - host URL
 * @param username - user's name used to login
 * @param password - user's password used to login
 * @throws {CannotAuthenticate}
 */
export const generateToken = async (host: string, username: string, password: string): Promise<JWT> => {
    const endPoint = host + JWT_ENDPOINT;
    const response = await axios.post(endPoint + 'token', { username, password });
    switch (response.status) {
        case 403: throw new Error('CannotAuthenticate: Bad username or password');
        case 404: throw new Error(`CannotAuthenticate: Page doesn\'t exists, make sure JWT is installed`);
    }

    return response.data as JWT;
};

/**
 * Validate token
 * @param host - host URL
 * @param token - token to validate
 * @returns true if token is successfully validated
 */
export const validateToken = async (host: string, token: string): Promise<boolean> => {
    const endPoint = host + JWT_ENDPOINT;
    const authHeader = { headers: { Authorization: 'bearer ' + token } };
    const response = await axios.post(endPoint + 'validate', {}, authHeader);
    if (response.status === 200) {
        return true;
    }
    return false;
};

/**
 * Connect to wordpress jwt API
 * @param host - url to wordpress
 * @throws {CannotConnect}
 */
export const connectToJwt = async (host: string) => {
    const response = await axios.post(`${host}/${JWT_ENDPOINT}/token`);
    if (response.status === 404) {
        throw new Error('CannotConnect: bad host or JWT is not installed');
    }

    return {
        /**
         * Authenticate user
         * @param username - user's name used to login
         * @param password - user's password used to login
         * @throws {CannotAuthenticate}
         */
        generateToken: generateToken.bind(null, host),

        /**
         * Validate token
         * @param token - token to validate
         * @returns true if token is successfully validated
         */
        validateToken: validateToken.bind(null, host),
    };
};

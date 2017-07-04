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
export const generateToken = async (host: string, username: string, password: string): Promise<JWT> => {
    const endPoint = host + JWT_ENDPOINT;
    const response = await axios.post(endPoint + 'token', { username, password });
    if (!response.data.token) {
        throw new Error('CannotAuthenticate: bad username or password');
    }
    return response.data as JWT;
};

/**
 * Validate token
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
 */
export const connect = async (host: string) => {
    // try to connect
    return {
        /**
         * Authenticate user
         * @param host - hot URL
         * @param username - user's name used to login
         * @param password - user's password used to login
         * @throws {CannotAuthenticate}
         */
        generateToken: (username: string, password: string) => generateToken(host, username, password),

        /**
         * Validate token
         * @param token - token to validate
         * @returns true if token is successfully validated
         */
        validateToken: (token: string) => validateToken(host, token),
    };
};

(async () => {
    const x = await connect('http://localhost:8080/wordpress');
    const token = await x.generateToken('daniel', 'daniel');
    console.log(token);
})();

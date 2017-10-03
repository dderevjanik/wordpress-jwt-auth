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
export declare const generateToken: (host: string, username: string, password: string) => Promise<JWT>;
/**
 * Validate token
 * @param host - host URL
 * @param token - token to validate
 * @returns true if token is successfully validated
 */
export declare const validateToken: (host: string, token: string) => Promise<boolean>;
/**
 * Connect to wordpress jwt API
 * @param host - url to wordpress
 * @throws {CannotConnect}
 */
export declare const connectToJwt: (host: string) => Promise<{
    generateToken: any;
    validateToken: any;
}>;

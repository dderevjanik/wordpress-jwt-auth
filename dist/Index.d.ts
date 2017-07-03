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
export declare const authenticate: (host: string, username: string, password: string) => Promise<{
    validate: () => Promise<boolean>;
    token: string;
    user_email: string;
    user_nicename: string;
    user_display_name: string;
}>;

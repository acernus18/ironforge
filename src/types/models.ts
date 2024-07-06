export interface Session {
    sessionId: string;
    userId: string;
    privileges: string[];
    apiAccessible: string[];
}
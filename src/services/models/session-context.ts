export class SessionContext {
    public sessionId: string;
    public userId: string;
    public password: string;
    public userName: string;
    public roles: string[];
    public privileges: string[];
    public apiAccessible: string[];

    public constructor() {
        this.sessionId = "";
        this.userId = "";
        this.password = "";
        this.userName = "";
        this.roles = [];
        this.privileges = [];
        this.apiAccessible = [];
    }
}
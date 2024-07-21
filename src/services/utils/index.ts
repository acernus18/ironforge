export class Utils {
    public static getInfoFromAuthorization(header: string | null): [string, string] {
        // const basicAuth = request.headers.get("authorization");
        const basicAuth = header;
        if (!basicAuth) {
            return ["", ""];
        }
        // Extracting the value after 'Basic '
        const authValue = basicAuth.split(" ")[1];
        // Decoding the Base64-encoded credentials
        const [username, password] = atob(authValue).split(":");
        return [username, password];
    }

    public static async get<T>(path: string, fromServer: boolean = false): Promise<T> {
        const response = await fetch(`${fromServer ? process.env["HOST_URL"] : ""}${path}`, {method: "GET"});
        return await response.json() as T;
    }

    public static async post<T>(path: string, data: any, fromServer: boolean = false): Promise<T> {
        const response = await fetch(`${fromServer ? process.env["HOST_URL"] : ""}${path}`, {
            method: "POST", body: JSON.stringify(data)
        });
        return await response.json() as T;
    }

    public static async put<T>(path: string, data: any, fromServer: boolean = false): Promise<T> {
        const response = await fetch(`${fromServer ? process.env["HOST_URL"] : ""}${path}`, {
            method: "PUT", body: JSON.stringify(data)
        });
        return await response.json() as T;
    }

    public static deserialize<T extends object>(t: { new(): T }, json: string): T {
        // To create a new object within a generic piece of code need to use the constructor function of the type.
        // use t: { new(): T;}, instead of using t: T
        return Object.assign(new t(), JSON.parse(json));
    }

    public static unique<T>(arr: T[]): T[] {
        const result: T[] = [];
        new Set(arr).forEach(v => result.push(v));
        return result;
    }
}
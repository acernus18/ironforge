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

    public static unique<T>(arr: T[]): T[] {
        const result: T[] = [];
        new Set(arr).forEach(v => result.push(v));
        return result;
    }
}
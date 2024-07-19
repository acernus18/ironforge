import {createClient} from "redis";
import {PrismaClient} from "@prisma/client";

import {Result} from "@/services/types/structs";
import {ErrCacheFail} from "@/services/types/errors";
import {AsyncSupplier} from "@/services/types/functions";

export class System {
    public static readonly SessionKey = "ironforge:system:session:";
    private static instance: System;
    private readonly database: PrismaClient;
    private readonly redis: ReturnType<typeof createClient>;

    private constructor() {
        console.log("[System]: creating database client...");
        this.database = new PrismaClient({
            log: ["query", "info", "warn", "error"],
        });
        console.log("[System]: creating database client successful");
        this.redis = createClient({
            url: process.env["REDIS_URL"],
        });
    }

    public static getInstance(): System {
        if (!System.instance) {
            System.instance = new System();
        }
        return System.instance;
    }

    public getDatabase() {
        return this.database;
    }

    public async getRedis() {
        if (!this.redis.isReady) {
            await this.redis.connect();
        }
        return this.redis;
    }

    public async cache<T>(key: string, expire: number, supplier: AsyncSupplier<T>): Promise<Result<T>> {
        try {
            const redis = await this.getRedis();
            const response = await redis.get(key);
            if (response !== null) {
                const result = JSON.parse(response) as T;
                console.log("[Cache]: hit redis cache, value =", result);
                return [result, null];
            }
            const [result, err] = await supplier();
            if (err !== null) {
                return [null, err];
            }
            console.log("Cache: miss redis cache, value =", result);
            await redis.setEx(key, expire, JSON.stringify(result));
            return [result, null];
        } catch (e) {
            return [null, new Error(`${ErrCacheFail} ${e}`)];
        }
    }

    public static getInfoFromAuthorization(request: Request): [string, string] {
        const basicAuth = request.headers.get("authorization");
        if (!basicAuth) {
            return ["", ""];
        }
        // Extracting the value after 'Basic '
        const authValue = basicAuth.split(" ")[1];
        // Decoding the Base64-encoded credentials
        const [username, password] = atob(authValue).split(":");
        return [username, password];
    }

    public static async post(path: string, data: any, fromServer: boolean = false) {
        const response = await fetch(`${fromServer ? process.env["HOST_URL"] : ""}${path}`, {
            method: "POST", body: JSON.stringify(data)
        });
        return await response.json();
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
import {createClient} from "redis";
import {PrismaClient} from "@prisma/client";
import {Result} from "@/types/structs";
import {ErrSessionNotExist} from "@/types/errors";
import {SessionContext} from "@/models/session-context";

export class System {
    private static readonly SessionKey = "ironforge:system:session";
    private static instance: System;
    private readonly database: PrismaClient;
    private readonly redis: ReturnType<typeof createClient>;

    private constructor() {
        this.database = new PrismaClient({
            log: ["query", "info", "warn", "error"],
        });
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

    public async setSession(id: string, session: SessionContext) {
        const redis = await this.getRedis();
        await redis.hSet(System.SessionKey, id, JSON.stringify(session));
    }

    public async getSession(id: string): Promise<Result<SessionContext>> {
        const result: Result<SessionContext> = [null, null];
        try {
            const redis = await this.getRedis();
            const session = await redis.hGet(System.SessionKey, id);
            if (!session) {
                result[1] = new Error(ErrSessionNotExist);
            }
            result[0] = System.deserialize(SessionContext, session!);
        } catch (err) {
            result[1] = err as Error;
        }
        return result;
    }

    public static async postFromClient(path: string, data: any) {
        const response = await fetch(`${process.env["HOST_URL"]}${path}`, {
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
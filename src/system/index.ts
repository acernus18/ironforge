import {createClient} from "redis";
import {PrismaClient} from "@prisma/client";
import {Session} from "@/types/models";
import {Result} from "@/types/structs";
import {ErrSessionNotExist} from "@/types/errors";

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

    public async setSession(id: string, session: Session) {
        const redis = await this.getRedis();
        await redis.hSet(System.SessionKey, id, JSON.stringify(session));
    }

    public async getSession(id: string): Promise<Result<Session>> {
        const result: Result<Session> = [null, null];
        try {
            const redis = await this.getRedis();
            const session = await redis.hGet(System.SessionKey, id);
            if (!session) {
                result[1] = new Error(ErrSessionNotExist);
            }
            result[0] = JSON.parse(session!) as Session;
        } catch (err) {
            result[1] = err as Error;
        }
        return result;
    }

    public async postFromClient(path: string, data: any) {
        const response = await fetch(`${process.env["HOST_URL"]}${path}`, {
            method: "POST", body: JSON.stringify(data)
        });
        return await response.json();
    }
}
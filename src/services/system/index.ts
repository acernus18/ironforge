import {createClient} from "redis";
import {PrismaClient} from "@prisma/client";

import {Result} from "@/common/structs";
import {ErrCacheFail} from "@/services/types/errors";
import {AsyncSupplier} from "@/common/functions";

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
            console.log("[System]: connecting redis for first place...");
            await this.redis.connect();
            console.log("[System]: connecting redis successful");
        }
        return this.redis;
    }

    /**
     * Caching supplier results to redis
     * @param key key for redis storage
     * @param expire time for cache exits
     * @param supplier providing results
     * @param mode 0 normal; 1 force cache; 2 force supplier;
     */
    public async cache<T>(key: string, expire: number, supplier: AsyncSupplier<T>, mode: number = 0): Promise<Result<T>> {
        try {
            const redis = await this.getRedis();
            if (mode !== 2) {
                const response = await redis.get(key);
                if (response !== null) {
                    const result = JSON.parse(response) as T;
                    console.log("[Cache]: hit redis cache, value =", result);
                    return [result, null];
                }
                if (mode === 1) {
                    return [null, null];
                }
            }
            const [result, err] = await supplier();
            if (err !== null) {
                return [null, err];
            }
            console.log("[Cache]: miss redis cache, value =", result);
            await redis.setEx(key, expire, JSON.stringify(result));
            console.log("[Cache]: caching value successful");
            return [result, null];
        } catch (e) {
            return [null, new Error(`${ErrCacheFail} ${e}`)];
        }
    }
}
import {createClient} from "redis";
import {PrismaClient} from "@prisma/client";
import {Rune} from "acernus-rune";

export class Application {

    // Singleton pattern Static
    private static instance: Application;

    public static getInstance(): Application {
        if (!Application.instance) {
            Application.instance = new Application();
        }
        return Application.instance;
    }

    // Singleton pattern Private
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
     * @param force force supplier;
     * @param supplier providing results
     */
    public async cache<T>(key: string, expire: number, force: boolean, supplier?: () => Rune.AsyncResult<T>): Promise<Rune.Result<T>> {
        const cacheKey = `ironforge::cache::${key}`;
        try {
            const redis = await this.getRedis();
            let result = null;
            let err = null;
            if (force) {
                if (typeof supplier !== "function") {
                    return [null, new Rune.Exception("", -1, "SystemError")];
                }
                [result, err] = await supplier();
                if (err !== null) {
                    return [null, err];
                }
                console.log("[Cache]: caching, value =", result);
                await redis.setEx(cacheKey, expire, JSON.stringify(result));
                return [result, null];
            }

            const response = await redis.get(cacheKey);
            if (response !== null) {
                result = JSON.parse(response) as T;
                console.log("[Cache]: hit redis cache, value =", result);
                return [result, null];
            }
            if (typeof supplier !== "function") {
                return [null, null];
            }
            [result, err] = await supplier();
            if (err !== null) {
                return [null, err];
            }
            console.log("[Cache]: miss redis cache, value =", result);
            await redis.setEx(cacheKey, expire, JSON.stringify(result));
            console.log("[Cache]: caching value successful");
            return [result, null];
        } catch (e) {
            return [null, new Rune.Exception("", -1, "Cache Failed")];
        }
    }
}
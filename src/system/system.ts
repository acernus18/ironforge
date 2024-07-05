import {PrismaClient} from "@prisma/client";

export class System {
    private static instance: System;
    private readonly database: PrismaClient;

    private constructor() {
        this.database = new PrismaClient({
            log: ["query", "info", "warn", "error"],
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
}
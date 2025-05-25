import {PrismaClient} from "@prisma/client";

import {Application} from "@/application";

export abstract class Repository {

    private readonly client: PrismaClient;

    public constructor() {
        this.client = Application.getInstance().getDatabase();
    }
}

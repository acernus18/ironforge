import {PrismaClient} from "@prisma/client";
import {System} from "@/system/system";

export async function echo() {
    const client: PrismaClient = System.getInstance().getDatabase();
    const users = await client.authUser.findMany();
    console.log(users);
}

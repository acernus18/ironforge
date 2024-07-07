import {System} from "@/system";
import {Result} from "@/types/structs";
import {SessionContext} from "@/models/session-context";
import {ErrUserNotExist} from "@/types/errors";

export async function querySessionContext(userId: string): Promise<Result<SessionContext>> {
    const result = new SessionContext();
    const database = System.getInstance().getDatabase();
    const authUser = await database.authUser.findUnique({where: {id: userId}});
    if (authUser === null) {
        return [null, new Error(ErrUserNotExist)];
    }
    result.userId = authUser.id;
    result.userName = authUser.name;
    return [result, null];
}
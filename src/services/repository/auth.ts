import {System} from "@/services/system";
import {Result} from "@/services/types/structs";
import {SessionContext} from "@/services/models/session-context";
import {ErrUserNotExist} from "@/services/types/errors";

export async function querySessionContext(userId: string): Promise<Result<SessionContext>> {
    const result = new SessionContext();
    const database = System.getInstance().getDatabase();
    const authUser = await database.authUser.findUnique({where: {id: userId}});
    if (authUser === null) {
        return [null, new Error(ErrUserNotExist)];
    }
    result.userId = authUser.id;
    result.userName = authUser.name;
    const userRoles = await database.authUserRole.findMany({where: {userId: result.userId}});
    for (const role of userRoles) {
        result.roles.push(role.roleId);
    }
    const privileges = [];
    for (const role of result.roles) {
        const userPrivileges = await database.authRolePrivilege.findMany({where: {roleId: role}});
        for (const privilege of userPrivileges) {
            privileges.push(privilege.privilegeId);
        }
    }
    result.privileges = System.unique(privileges);
    const apiAccessible = [];
    for (const privilege of result.privileges) {
        const apiArray = await database.authAPIPrivilege.findMany({where: {privilegeId: privilege}});
        for (const api of apiArray) {
            apiAccessible.push(api.apiId);
        }
    }
    result.apiAccessible = System.unique(apiAccessible);
    return [result, null];
}

export async function querySessionContextWithCache(userId: string): Promise<Result<SessionContext>> {
    const cacheKey = `${System.SessionKey}${userId}`;
    return System.getInstance().cache(cacheKey, 3600, async () => querySessionContext(userId));
}
// import {Result} from "@/common/structs";
// import {Application} from "@/application";
// import {Rune} from "acernus-rune";
//
// export async function querySessionContext(userId: string): Promise<Result<Rune.SessionProtocol>> {
//     // const result = new SessionContext();
//     const database = Application.getInstance().getDatabase();
//     const authUser = await database.authUser.findUnique({where: {id: userId}});
//     if (authUser === null) {
//         return [null, new Error("11111222")];
//     }
//     const userRoles = await database.authUserRole.findMany({where: {userId: authUser.id}});
//     const privileges = [];
//     for (const role of userRoles) {
//         const userPrivileges = await database.authRolePrivilege.findMany({where: {roleId: role.roleId}});
//         for (const privilege of userPrivileges) {
//             privileges.push(privilege.privilegeId);
//         }
//     }
//     const result = {
//         sn: "",
//         sid: "",
//         uid: authUser.id,
//         credentials: new Set<string>(privileges),
//     }
//     return [result, null];
// }

import {Repository} from "@/repository/repository";

export class AuthRepository extends Repository {

}
// import {NextApiRequest, NextApiResponse} from "next";
// import {Utils} from "../../../utils";
// import {querySessionContext} from "@/repository/auth";
// import {SessionContext} from "@/models/session-context";
//
// export default async function handler(request: NextApiRequest, response: NextApiResponse) {
//     const [username] = Utils.getInfoFromAuthorization(request.headers.authorization ?? "");
//     if (username !== "") {
//         const [result, err] = await querySessionContext(username);
//         if (result !== null && err === null) {
//             // return Response.json(result);
//             response.json(result);
//             return;
//         }
//     }
//     response.json(new SessionContext());
//     // response.appendHeader("WWW-authenticate", 'Basic realm="Secure Area"');
//     // response.status(401);
// }

// import {NextApiRequest, NextApiResponse} from "next";
// import {querySessionContext} from "@/repository/auth";
//
// export default async function handler(request: NextApiRequest, response: NextApiResponse) {
//     if (request.method === "GET") {
//         response.appendHeader("WWW-authenticate", 'Basic realm="Secure Area"');
//         response.status(401).send({});
//         return;
//     }
//
//     if (request.method === "POST") {
//         const [context] = await querySessionContext(JSON.parse(request.body)["username"]);
//         if (context !== null) {
//             response.json({exist: true, username: context.userId, password: context.password});
//             return;
//         }
//         response.json({exist: false, username: "", password: ""});
//         return;
//     }
// }
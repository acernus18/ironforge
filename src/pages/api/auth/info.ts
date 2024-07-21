import {NextApiRequest, NextApiResponse} from "next";
import {Utils} from "@/services/utils";
import {querySessionContextWithCache} from "@/services/repository/auth";
import {SessionContext} from "@/services/models/session-context";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    const [username] = Utils.getInfoFromAuthorization(request.headers.authorization ?? "");
    if (username !== "") {
        const [result, err] = await querySessionContextWithCache(username, false);
        if (result !== null && err === null) {
            // return Response.json(result);
            response.json(result);
            return;
        }
    }
    response.json(new SessionContext());
    // response.appendHeader("WWW-authenticate", 'Basic realm="Secure Area"');
    // response.status(401);
}

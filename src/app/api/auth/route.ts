import {NextRequest, NextResponse} from "next/server";

import {System} from "@/services/system";
import {Utils} from "@/services/utils";
import {querySessionContextWithCache} from "@/services/repository/auth";

export async function GET(request: NextRequest) {
    const [username] = Utils.getInfoFromAuthorization(request);
    if (username !== "") {
        const [result, err] = await querySessionContextWithCache(username);
        if (result !== null && err === null) {
            return Response.json(result);
        }
    }
    return new Response(null, {status: 401, headers: {"WWW-authenticate": 'Basic realm="Secure Area"'}});
}

export async function POST(request: NextRequest) {
    const requestBody = await request.json();
    const user = await System.getInstance().getDatabase().authUser.findUnique({
        where: {id: requestBody.username ?? ""}
    });
    if (user === null) {
        return NextResponse.json({exist: false, username: "", password: ""});
    }
    return NextResponse.json({exist: true, username: user.id, password: user.password});
}
import {System} from "@/system";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
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
import {NextRequest, NextResponse} from "next/server";
import {System} from "@/services/system";

async function cmsAuthenticating(request: NextRequest) {
    const [username, password] = System.getInfoFromAuthorization(request);
    if (username === "" || password === "") {
        return false;
    }
    // Finding the user in the database
    const user = await System.post("/api/auth", {username: username}, true);
    return user.username === username && user.password === password;
}

export async function middleware(request: NextRequest) {
    if (!request.nextUrl.pathname.startsWith("/api")) {
        const url = request.nextUrl;
        if (await cmsAuthenticating(request)) {
            return NextResponse.next();
        } else {
            // Redirecting to an authentication endpoint if credentials are invalid or missing
            url.pathname = "/api/auth";

            // Redirecting the request
            return NextResponse.rewrite(url);
        }
    }
    return NextResponse.next();
}
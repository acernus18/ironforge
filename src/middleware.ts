import {NextRequest, NextResponse} from "next/server";
import {Utils} from "@/services/utils";

async function cmsAuthenticating(request: NextRequest) {
    const [username, password] = Utils.getInfoFromAuthorization(request);
    console.log("cmsAuthenticating getInfoFromAuthorization =", username, password);
    if (username === "" || password === "") {
        return false;
    }
    // Finding the user in the database
    const user = await Utils.post<{
        exist: boolean,
        username: string,
        password: string
    }>("/api/auth", {username: username}, true);
    console.log("cmsAuthenticating getUser =", user);
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
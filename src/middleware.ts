import {NextRequest, NextResponse} from "next/server";
import {System} from "@/system";

async function cmsAuthenticating(request: NextRequest) {
    const basicAuth = request.headers.get("authorization");
    if (!basicAuth) {
        return false;
    }
    // Extracting the value after 'Basic '
    const authValue = basicAuth.split(" ")[1];

    // Decoding the Base64-encoded credentials
    const [username, password] = atob(authValue).split(":");

    // Finding the user in the database
    const user = await System.getInstance().postFromClient("/api/auth", {username: username});
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
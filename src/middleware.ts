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
    if (request.nextUrl.pathname.startsWith("/cms")) {
        // const basicAuth = request.headers.get("authorization");
        const url = request.nextUrl;
        // console.log("basic auth", basicAuth);
        // if (basicAuth) {
        //     // Extracting the value after 'Basic '
        //     const authValue = basicAuth.split(" ")[1];
        //
        //     // Decoding the Base64-encoded credentials
        //     const [username, pwd] = atob(authValue).split(":");
        //
        //     // Finding the user in the simulated database
        //     const user = {
        //         username: "1111",
        //         password: "2222",
        //     };
        //
        //     if (user && pwd === user.password) {
        //         // Allowing the request to continue if credentials match
        //         return NextResponse.next();
        //     }
        // }

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
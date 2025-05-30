import {NextRequest, NextResponse} from "next/server";

function basicAuthFilter(authorization: string | null): boolean {
    const configs = [
        ["admin", "admin"],
    ];
    let username = "";
    let password = "";
    if (typeof authorization !== "string") {
        return false;
    }
    [username, password] = atob(authorization.split(" ")[1]).split(":");
    for (const config of configs) {
        if (config[0] === username && config[1] === password) {
            return true;
        }
    }
    return false;
}

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/_next")) {
        return NextResponse.next();
    }
    if (request.nextUrl.pathname.startsWith("/api/")) {
        return NextResponse.next();
    }
    const excludes = [
        "/", "favicon.ico", "sitemap.xml", "robots.txt"
    ];
    if (excludes.includes(request.nextUrl.pathname)) {
        return NextResponse.next();
    }
    if (!basicAuthFilter(request.headers.get("authorization"))) {
        console.log(request.nextUrl.pathname);
        return NextResponse.json({}, {
            status: 401,
            headers: {"WWW-authenticate": `Basic realm="Secure Area"`}
        });
    }
    return NextResponse.next();
}
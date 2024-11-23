import {NextApiRequest, NextApiResponse} from "next";

// function route()

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method !== "POST") {
        response.status(404);
        response.end();
        return;
    }
}
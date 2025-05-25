import {NextApiRequest, NextApiResponse} from "next";
import {Services} from "@/services";

export default async function handler(req: NextApiRequest, resp: NextApiResponse) {
    await Services.getInstance().proceed(req, resp);
}
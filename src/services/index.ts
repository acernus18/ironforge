import {NextApiRequest, NextApiResponse} from "next";
import {Rune} from "acernus-rune";

import {Application} from "@/application";
import {login} from "@/services/auth-service";

export class Services {
    // Singleton pattern Static
    private static instance: Services;

    public static getInstance(): Services {
        if (!Services.instance) {
            Services.instance = new Services();
        }
        return Services.instance;
    }

    // Singleton pattern Private
    private provider: Rune.ServiceProvider;

    private constructor() {
        const servicesMap = new Map<string, Rune.Service>();
        servicesMap.set("auth/login", login);
        const sessionProvider = async (sid: string) => await Application.getInstance().fetchSessionFromCache(sid);
        this.provider = new Rune.ServiceProvider(sessionProvider, servicesMap);
    }

    public async proceed(req: NextApiRequest, resp: NextApiResponse) {
        const request = req.body as Rune.RequestProtocol;
        console.log(request);
        const result = await this.provider.proceed(request);
        console.log(result);
        resp.json(result);
    }
}
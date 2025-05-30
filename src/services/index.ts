import {NextApiRequest, NextApiResponse} from "next";
import {Rune} from "acernus-rune";

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
        this.provider = new Rune.ServiceProvider(new Map<string, Rune.Service>([
            ["system/health", async (context) => [context, null]],
        ]));
    }

    public async proceed(req: NextApiRequest, resp: NextApiResponse) {
        const request = req.body as Rune.RequestProtocol;
        console.log(request);
        const result = await this.provider.proceed(request);
        console.log(result);
        resp.json(result);
    }
}
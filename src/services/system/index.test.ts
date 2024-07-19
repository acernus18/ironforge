import {System} from "@/services/system/index";
import {SessionContext} from "@/services/models/session-context";

describe("System Test", () => {
    // test("Session", async () => {
    //     await System.getInstance().setSession("111111", {
    //         sessionId: "111111",
    //         userId: "liufenglin",
    //         privileges: ["22", "22"],
    //         apiAccessible: [],
    //     });
    //     const [session, error] = await System.getInstance().getSession("111111");
    //     console.log(session, error);
    // });

    test("Deserialize", async () => {
        // const session = new SessionContext();
        // session.userId = "111";
        // const serialized = JSON.stringify(session);
        // const target = System.deserialize(SessionContext, serialized)
        // console.log(target);


        const system = System.getInstance();

        await system.cache<SessionContext>("123", 200, async () => {
            const session = new SessionContext();
            session.userId = "111";
            return [session, null];
        });


        // target.test();
    });
});
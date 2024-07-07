import {System} from "@/system/index";
import {SessionContext} from "@/models/session-context";

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
        const session = new SessionContext();
        session.userId = "111";
        const serialized = JSON.stringify(session);
        const target = System.deserialize(SessionContext, serialized)
        console.log(target);
        // target.test();
    });
});
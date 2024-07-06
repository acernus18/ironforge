import {System} from "@/system/index";

describe("System Test", () => {
    test("Session", async () => {
        await System.getInstance().setSession("111111", {
            sessionId: "111111",
            userId: "liufenglin",
            privileges: ["22", "22"],
            apiAccessible: [],
        });
        const [session, error] = await System.getInstance().getSession("111111");
        console.log(session, error);
    });
});
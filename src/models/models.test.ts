import {SessionContext} from "@/models/session-context";

test("111", () => {
    const session = new SessionContext();
    session.userId = "lll";
    const json = JSON.stringify(session);
    console.log(json);
    const sessionDuplicate = Object.assign(new SessionContext(), JSON.parse(json)) as SessionContext;
    console.log(sessionDuplicate);
});
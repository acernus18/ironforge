import {querySessionContext} from "@/repository/auth";

describe("Repository", () => {
    test("Test", async () => {
        const [context, err] = await querySessionContext("admin");

        console.log("Context =", context);
        console.log("Error =", err);
    });
});
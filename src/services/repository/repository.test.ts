import {querySessionContextWithCache} from "@/services/repository/auth";

describe("Repository", () => {
    test("Test", async () => {
        const [context, err] = await querySessionContextWithCache("admin");

        console.log("Context =", context);
        console.log("Error =", err);
    });
});
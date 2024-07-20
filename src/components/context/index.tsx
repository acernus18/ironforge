import React from "react";
import {SessionContext} from "@/services/models/session-context";
import {useRemoteData} from "@/components/hooks/use-remote-data";
import {Result} from "@/services/types/structs";
import {Utils} from "@/services/utils";

export const AuthContext = React.createContext<SessionContext | null>(new SessionContext());

// AuthContext.
export const AuthContextProvider = ({children}: Readonly<{ children: React.ReactNode }>) => {
    const {result} = useRemoteData<SessionContext>(new SessionContext(), React.useCallback(async () => {
        const response: Result<SessionContext> = [null, null];
        await Utils.post("/api/auth", {username: ""});
        return response;
    }, []));
    return (
        <AuthContext.Provider value={result[0]}>
            {children}
        </AuthContext.Provider>
    );
};

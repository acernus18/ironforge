import React from "react";
import {SessionContext} from "@/services/models/session-context";
import {useRemoteData} from "@/components/hooks/use-remote-data";

export const UserSessionContext = React.createContext<SessionContext>(new SessionContext());

export function UserSessionContextProvider({children}: Readonly<{ children: React.ReactNode }>) {
    const {result} = useRemoteData<SessionContext>(new SessionContext(), React.useCallback(async () => {
        const response = await fetch("/api/auth/info");
        return [await response.json(), null];
    }, []));
    const [session] = result;
    return (
        <UserSessionContext.Provider value={session ?? new SessionContext()}>
            {children}
        </UserSessionContext.Provider>
    );
}
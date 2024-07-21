"use client";

import React from "react";
import {SessionContext} from "@/services/models/session-context";
import {useRemoteData} from "@/components/hooks/use-remote-data";

export const UserSessionContext = React.createContext<SessionContext | null>(new SessionContext());

export function UserSessionContextProvider({children}: Readonly<{ children: React.ReactNode }>) {
    const {result} = useRemoteData<SessionContext>(new SessionContext(), React.useCallback(async () => {
        const response = await fetch("/api/auth/info");
        return [await response.json(), null];
    }, []));
    const [session, err] = result;
    return (
        <UserSessionContext.Provider value={session}>
            {children}
        </UserSessionContext.Provider>
    );
}
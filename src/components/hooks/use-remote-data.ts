import React from "react";
import {RemoteData} from "@/services/types/structs";
import {AsyncSupplier} from "@/services/types/functions";

export function useRemoteData<T>(def: T, supplier: AsyncSupplier<T>): RemoteData<T> {
    // Initializing Default Data
    const [result, setResult] = React.useState<RemoteData<T>>({
        loading: false, result: [def, null],
    });
    // [Note]: Supplier must be wrapped by React.useCallback
    React.useEffect(() => {
        setResult({...result, loading: true});
        supplier()
            .then(([res, err]) => setResult({loading: false, result: [res, err]}))
            .catch((err) => setResult({loading: false, result: [null, err]}));
    }, [supplier]);
    return result;
}
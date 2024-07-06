export type Result<T, E = Error> = [T | null, E | null];

export type RemoteData<T> = {
    loading: boolean;
    result: Result<T>;
};

import {Result} from "@/common/structs";

// Functions without Result;

export type Consumer<T> = (arg: T) => void;

export type Predicate<T> = (arg: T) => boolean;

export type Operator<T> = (arg0: T, arg1: T) => T;

// Functions with Result;

export type Supplier<T, E = Error> = () => Result<T, E>;

export type Function<T, R, E = Error> = (arg: T) => Result<R, E>;

// Functions with Promise<Result>;

export type AsyncSupplier<T, E = Error> = () => Promise<Result<T, E>>;

export type AsyncFunction<T, R, E = Error> = (arg: T) => Promise<Result<R, E>>;

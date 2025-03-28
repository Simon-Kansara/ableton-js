import { Ableton } from "..";
export declare class Namespace<GP, TP, SP, OP> {
    protected ableton: Ableton;
    protected ns: string;
    protected nsid?: string | undefined;
    protected transformers: {
        [T in keyof TP]: (val: T extends keyof GP ? GP[T] : unknown) => TP[T];
    };
    protected cachedProps: Partial<{
        [T in keyof GP]: boolean;
    }>;
    constructor(ableton: Ableton, ns: string, nsid?: string | undefined);
    get<T extends keyof GP>(prop: T, useCache?: boolean): Promise<T extends keyof TP ? TP[T] : GP[T]>;
    set<T extends keyof SP>(prop: T, value: SP[T]): Promise<null>;
    addListener<T extends keyof OP>(prop: T, listener: (data: T extends keyof TP ? TP[T] : OP[T]) => any): Promise<() => Promise<boolean | undefined>>;
    /**
     * Sends a raw function invocation to Ableton.
     * This should be used with caution.
     */
    sendCommand(name: string, args?: {
        [k: string]: any;
    }, etag?: string): Promise<any>;
    /**
     * Sends a raw function invocation to Ableton and expects the
     * result to be a CacheResponse with `data` and an `etag`.
     */
    protected sendCachedCommand(name: string, args?: {
        [k: string]: any;
    }): Promise<any>;
}

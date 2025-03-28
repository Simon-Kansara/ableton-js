import type LruCache from "lru-cache";
export type CachedResponse = {
    __cached: true;
};
export type CacheResponse = CachedResponse | {
    data: any;
    etag: string;
};
export declare const isCached: (obj: CacheResponse) => obj is CachedResponse;
export interface CacheObject {
    etag: string;
    data: any;
}
export type Cache = LruCache<string, CacheObject>;

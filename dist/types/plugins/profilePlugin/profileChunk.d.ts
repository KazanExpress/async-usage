export declare function profileChunk(path: string, name: string, logStyle?: string): {
    start(): void;
    stop(type: "error" | "info" | "cache", e?: Error | undefined): void;
};

export declare function profileChunk(path: string, name: string, logStyle?: string): {
    start(): void;
    stop(type: "error" | "cache" | "info", e?: Error | undefined): void;
};

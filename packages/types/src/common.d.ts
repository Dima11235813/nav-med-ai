export type ID = string;
export type Timestamp = string;
export interface Result<T, E = Error> {
    success: boolean;
    data?: T;
    error?: E;
}
export type PartialUpdate<T> = {
    [P in keyof T]?: T[P];
};
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type KeysOfType<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
export interface Config {
    environment: 'development' | 'staging' | 'production';
    apiUrl: string;
    databaseUrl: string;
    redisUrl?: string;
}
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export interface BaseEvent {
    id: ID;
    type: string;
    timestamp: Timestamp;
    payload: Record<string, any>;
}
//# sourceMappingURL=common.d.ts.map
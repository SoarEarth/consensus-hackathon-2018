export interface AdminInfo {
    owner?: string;
    userAddress?: string;
}

export interface GrowNYCEvent {
    order: number;
    timestampInSeconds: number;
    sender: string;
    metadata: string;
}
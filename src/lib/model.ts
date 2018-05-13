export interface AdminInfo {
    owner?: string;
    userAddress?: string;
}

export interface Metadata {
    address?: string;
    lat?: string;
    lng?: string;
}

export interface GrowNYCEvent {
    order: number;
    timestamp: Date;
    sender: string;
    metadata: Metadata;
}
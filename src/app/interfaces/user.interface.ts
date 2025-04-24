export interface User {
    uid: string;
    email: string;
    displayName?: string;
    role: UserRole;
    createdAt: Date;
    lastLogin?: Date;
    isActive: boolean;
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}


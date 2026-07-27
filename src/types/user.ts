export type SystemRole = 'USER' | 'ADMIN'

export type User = {
    id: string;
    email: string;
    role: SystemRole;
    created_at: Date;
}


export type DBUserRow = User

export type DBUserWithPasswordRow = DBUserRow & {
    password_hash: string | null
}

export type TokenPayload = {
    userId: string;
    email: string;
    role: SystemRole;
}
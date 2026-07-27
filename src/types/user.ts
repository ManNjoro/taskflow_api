export type User = {
    id: string;
    email: string;
    role: string;
    created_at: Date;
}

export type DBUserRow = User

export type DBUserWithPasswordRow = DBUserRow & {
    password_hash: string | null
}
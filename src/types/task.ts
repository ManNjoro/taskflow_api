export type TaskStatus = 'IN_PROGRESS' | 'OPEN' | 'RESOLVED'
export type Task = {
    id: string;
    title: string;
    status: TaskStatus;
    user_id: string;
    created_at: Date;
    updated_at: Date;
}
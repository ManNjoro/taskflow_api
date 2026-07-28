import { pool } from "../lib/db.js";
import { Task } from "../types/task.js";

export async function createTask(userId: string, title: string): Promise<Task> {
    const result = await pool.query<Task>(
        `
        INSERT INTO support_tasks (title, user_id)
        VALUES ($1, $2)
        RETURNING id, title, status, user_id, created_at, updated_at
        `, [title, userId]
    )
    return result.rows[0];
}
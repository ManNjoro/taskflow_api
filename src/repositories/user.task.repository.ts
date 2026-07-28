import { pool } from "../lib/db.js";
import { Task } from "../types/task.js";

export async function createTask(userId: string, title: string): Promise<Task> {
  const result = await pool.query<Task>(
    `
        INSERT INTO support_tasks (title, user_id)
        VALUES ($1, $2)
        RETURNING id, title, status, user_id, created_at, updated_at
        `,
    [title, userId],
  );
  return result.rows[0];
}

export async function fetchTaskByUserId(userId: string): Promise<Task[]> {
  const result = await pool.query<Task>(
    `
        SELECT id, title, status, user_id, created_at, updated_at
        FROM support_tasks
        WHERE user_id = $1
        ORDER BY created_at DESC
        `,
    [userId],
  );
  return result.rows;
}


export async function findTaskByIdAndUserId(
  taskId: string,
  userId: string,
): Promise<Task | null> {
  const result = await pool.query<Task>(
    `
        SELECT id, title, status, user_id, created_at, updated_at
        FROM support_tasks
        WHERE id = $1 AND user_id = $2
    `, [taskId, userId]
  );
  return result.rows[0] ?? null
}
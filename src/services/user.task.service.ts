import { AppError } from "../errors/AppError.js";
import { fetchTaskByUserId } from "../repositories/user.repository.js";
import { createTask } from "../repositories/user.task.repository.js";
import { Task } from "../types/task.js";

function validateTitle(title: unknown): string{
    if(typeof title !== 'string' || !title.trim()){
        throw new AppError(400, 'Title is required')
    }
    const trimmedTitle = title.trim()

    if(trimmedTitle.length > 100)
        throw new AppError(400, 'Title must be 100 characters or less')

    return trimmedTitle
}

export async function createUserTask(userId: string, title: unknown): Promise<Task> {
    const validTitle = validateTitle(title)
    return createTask(userId, validTitle)
}

export async function getUserTasks(userId: string): Promise<Task[]>{
    return fetchTaskByUserId(userId)
}
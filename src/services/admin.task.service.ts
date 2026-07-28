import { AppError } from "../errors/AppError.js";
import { findAllTasks } from "../repositories/admin.task.repository.js";
import { Task, TASK_STATUSES, TaskStatus } from "../types/task.js";

type AdminTaskListQuery = {
    search?: string;
    status?: TaskStatus;
}

type AdminTaskListResponse = {
    tasks: Task[];
}

export async function getAdminTasks(query: AdminTaskListQuery): Promise<AdminTaskListResponse>{
    const search = query.search?.trim() || undefined;
    const status = query.status?.trim() || undefined;

    if(status && !TASK_STATUSES.includes(status as TaskStatus)){
        throw new AppError(400, 'status must be between open, inprogress, or resolved')
    }

    const tasks = await findAllTasks({
        search, status
    })

    return {
        tasks
    }
}
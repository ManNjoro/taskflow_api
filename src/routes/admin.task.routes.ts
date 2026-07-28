import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";
import { getAdminTasks, updateAdminTaskStatus } from "../services/admin.task.service.js";

export const adminTaskRouter = Router()

adminTaskRouter.use(authenticate, requireAdmin)

adminTaskRouter.get('/', async(req, res, next) => {
    try {
        const data = await getAdminTasks(req.query)
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        next(error)
    }
})

adminTaskRouter.patch('/:taskId', async(req, res, next) => {
    try {
        const task = await updateAdminTaskStatus(req.params.taskId, req.body.status)

        res.status(200).json({
            success: true,
            data: {task}
        })
    } catch (error) {
        next(error)
    }
})
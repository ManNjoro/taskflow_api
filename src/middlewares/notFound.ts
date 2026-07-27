import { NextFunction, Response, Request } from "express";

export function notFound(_req: Request, res: Response): void{
    res.status(500).json({
        success: false,
        messsge: 'Route not found'
    })
}
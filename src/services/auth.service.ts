import bcrypt from "bcryptjs";
import { AppError } from "../errors/AppError.js";
import { createUser, findUserByEmail } from "../repositories/user.repository.js";

export async function registerUser(email: string, password: string): Promise<void>{
    if(!email || !password) {
        throw new AppError(400, 'Email and password are required')
    }

    if(password.length < 6){
        throw new AppError(400, 'Password must be at least 6 characters long')
    }

    const normalizeEmail = email.toLowerCase().trim()

    const existingUser = await findUserByEmail(normalizeEmail)

    if(existingUser){
        throw new AppError(409, 'Email already exists')
    }
    
    const passwordHash = await bcrypt.hash(password, 10)

    await createUser(normalizeEmail, passwordHash)
}
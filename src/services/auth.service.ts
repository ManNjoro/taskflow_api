import bcrypt from "bcryptjs";
import { AppError } from "../errors/AppError.js";
import { createGoogleUser, createUser, findUserByEmail, findUserByEmailWithPassword, findUserByGoogleId, linkGoogleIdToUser } from "../repositories/user.repository.js";
import { signAccessToken } from "../lib/jwt.js";
import { getGoogleAuthUrl, getGoogleUserFromAuthCode } from "../lib/google.js";
import { User } from "../types/user.js";

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

export async function loginUser(email: string, password: string): Promise<{accessToken: string}>{
    if(!email || !password) {
        throw new AppError(400, 'Email and password are required')
    }

    const normalizeEmail = email.toLowerCase().trim()
    const user = await findUserByEmailWithPassword(normalizeEmail)

    if(!user?.password_hash) {
        throw new AppError(401, 'Invalid email or password')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash)

    if(!isPasswordValid) {
        throw new AppError(401, 'Invalid email or password')
    }

    const accessToken = signAccessToken({
        email: user.email,
        role: user.role,
        userId: user.id
    })

    return {accessToken}
}

export function startGoogleLogin(): string{
    return getGoogleAuthUrl()
}

function createAccessTokenForUser(user: User): string {
    return signAccessToken({
        userId: user.id,
        email: user.email,
        role: user.role
    })
}

export async function loginWithGoogle(code: string): Promise<{accessToken: string}> {
    const googleProfile = await getGoogleUserFromAuthCode(code)
    let user = await findUserByGoogleId(googleProfile.googleId)

    if(!user){
        user = await findUserByEmail(googleProfile.email)

        if(user) {
            user = await linkGoogleIdToUser(user.id, googleProfile.googleId)
        } else {
            user = await createGoogleUser(googleProfile.email, googleProfile.googleId)
        }
    }

    const accessToken = createAccessTokenForUser(user)

    return {accessToken}
}
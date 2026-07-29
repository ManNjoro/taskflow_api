import { AppError } from "../errors/AppError.js";
import { uploadBannerImageToCloudinary } from "../lib/cloudinary.js";
import { createAdminBanner, fetchAllAdminBannersFromDB } from "../repositories/admin.banner.repository.js";
import { Banner } from "../types/banner.js";

export async function createAdminBannerService(
    file: Express.Multer.File | undefined
): Promise<Banner>{
    if(!file){
        throw new AppError(400, 'Image is required')
    }

    if(!file.buffer){
        throw new AppError(400, 'The file is corrupted')
    }

    const {publicId, secureUrl} = await uploadBannerImageToCloudinary(
        file.buffer,
        {folder: 'nodejs-capstone-project'}
    )

    if(!secureUrl || !publicId){
        throw new AppError(500, 'cloudinary error occurred')
    }

    const banner = await createAdminBanner(secureUrl, publicId)
    return banner
}

export async function fetchAdminBanners(): Promise<Banner[]>{
    const banners = await fetchAllAdminBannersFromDB()
    return banners
}
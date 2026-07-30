import { AppError } from "../errors/AppError.js";
import { clearBannersCache, getBannersFromCache, setBannerCache } from "../lib/bannerCache.js";
import { uploadBannerImageToCloudinary } from "../lib/cloudinary.js";
import { addDeleteCloudinaryImageJob } from "../queues/deleteCloudinaryImage.queue.js";
import { createAdminBanner, deleteAdminBannerById, fetchAllAdminBannersFromDB } from "../repositories/admin.banner.repository.js";
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

    await clearBannersCache()
    return banner
}

export async function fetchAdminBanners(): Promise<Banner[]>{
    const getCachedBanners = await getBannersFromCache()

    if(getCachedBanners) return getCachedBanners
    const banners = await fetchAllAdminBannersFromDB()

    await setBannerCache(banners)
    return banners
}

export async function deleteAdminBannerService(
    bannerId: string
): Promise<void>{
    const publicId = await deleteAdminBannerById(bannerId)

    if(!publicId){
        throw new AppError(404, 'Banner not found')
    }

    await clearBannersCache()
    await addDeleteCloudinaryImageJob(publicId)
}

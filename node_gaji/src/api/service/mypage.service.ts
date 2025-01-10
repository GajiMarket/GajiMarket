import logger from '../../logger'
import { Storage } from '@google-cloud/storage'
import {Request} from 'express'
import {uploadImageDAO} from 'api/DAO/mypage.dao'
import multer from 'multer'
import path from 'path'
import dotenv from 'dotenv';

dotenv.config();

const storage = new Storage();
const bucket = storage.bucket(process.env.BUCKET_NAME as string);



export const uploadImageService = {
    uploadFilesToStorage: async (formData: Express.Multer.File[]) => {
        const uploadFiles = [];
        
        for (const file of formData) {
            const originalName = path.basename(file.originalname, path.extname(file.originalname));
            const extension = path.extname(file.originalname);
            const newFileName = `${originalName}-${Date.now()}${extension}`;

            // google Cloud storage에 파일 업로드
            const blob = bucket.file(newFileName);
            const blobStream = blob.createWriteStream({
                resumable: false,
            });

            await new Promise((resolve, reject) => {
                blobStream.on('finish', async() => {
                    const fileUrl = `https://storage.cloud.google.com/${process.env.BUCKET_NAME}/${process.env.BUCKET_USERPROFILE}/${newFileName}`;

                    // 업로드된 파일 정보를 DB에 저장
                    await uploadImageDAO(fileUrl);

                    uploadFiles.push(fileUrl);
                    resolve(fileUrl);

                });

                blobStream.on('error', reject);
                blobStream.end(file.buffer);
            });
    }

    return uploadFiles;

    },
};
    
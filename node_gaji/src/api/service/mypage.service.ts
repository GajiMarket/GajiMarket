import logger from '../../logger'
import { Storage } from '@google-cloud/storage'
import {uploadImageDAO} from '../DAO/mypage.dao'
import path from 'path'
import dotenv from 'dotenv';

dotenv.config();

const storage = new Storage({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    projectId: process.env.GOOGLE_PROJECT_ID
});
const bucket = storage.bucket(process.env.BUCKET_NAME as string);



export const uploadImageService = {
    uploadFilesToStorage: async (formData: Express.Multer.File[], id: string) => {
        const uploadFiles: Array<string> = [];
        
        for (const file of formData) {
            const originalName = path.basename(file.originalname, path.extname(file.originalname));
            const extension = path.extname(file.originalname);
            //google storage에 저장할 경로 및 파일 이름
            const newFileName = `userProfile/${originalName}-${Date.now()}${extension}`;

            logger.info({"orginalName": originalName});
            logger.info({"extension": extension});
            logger.info({"newFileName": newFileName});

            // google Cloud storage에 파일 업로드
            const blob = bucket.file(newFileName);
            const blobStream = blob.createWriteStream({
                resumable: false,
            });

            await new Promise((resolve, reject) => {
                blobStream.on('finish', async() => {
                    const fileUrl = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${newFileName}`;

                    // 이미지 공개 엑세스 설정
                    await blob.makePublic();

                    // 업로드된 파일 정보를 DB에 저장
                    const userNo = Number(id);
                    await uploadImageDAO(fileUrl, userNo);

                    // 이미지 경로URL 저장
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
    
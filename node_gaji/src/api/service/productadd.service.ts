import { addProductDAO, productImagesDAO } from "../DAO/product.dao";
import { IProduct } from "../models/product";
import IPhoto from '../models/photo';
import { logger } from "../../logger";
import path from 'path';
import dotenv from 'dotenv';
import {Storage} from '@google-cloud/storage'

dotenv.config();

type Product = Partial<IProduct&IPhoto>

const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  projectId: process.env.GOOGLE_PROJECT_ID,
});

const bucket = storage.bucket(process.env.BUCKET_NAME as string);


export const addfinderAPI = async (images: Express.Multer.File[], productData: {}): Promise<number | string[] | any> => {
  try {
    logger.info(`Processing product data in service:${productData}`);
    logger.debug(`service로 가져온 이미지:${images}`);

    const result = await addProductDAO(productData);
    if (!result) {
      logger.error("Product insertion failed in DAO");
      return;
    }

    const uploadFiles: string[] = [];
    const productId = Number(result);
    

    if(result) {


      //첫번째 요소는 인덱스 두번째는 값
      for (const [index, image] of images.entries()) {

        const originalName = path.basename(image.originalname, path.extname(image.originalname));
        const extension = path.extname(image.originalname);

        logger.info(`이미지 오리지널 이름: ${originalName}`);
        logger.info(`이미지 확장자:${extension}`);

        const newFileName = `product/${Date.now()}_${index + 1}${extension}`;

        //google Cloud storage에 파일 업로드
        const blob = bucket.file(newFileName);
        const blobStream = blob.createWriteStream({
          resumable: false,
        });

        //스토리지 업로드 후 이벤트 처리
        await new Promise((resolve, reject) => {
          blobStream.on('finish', async() => {
            const fileUrl = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${newFileName}`

            await blob.makePublic();

            uploadFiles.push(fileUrl);

            logger.debug(`업로드된 이미지들: ${uploadFiles}`);

            const response = await productImagesDAO(uploadFiles, productId);



            resolve(uploadFiles);

            logger.debug(`반환한 photo 테이블 값: ${response}`);

            return response;

          });

          blobStream.on('error', reject);
          blobStream.end(image.buffer);


        });


      }



    }

    logger.info("Product added successfully in service");
    return {uploadFiles, result};

  } catch (error) {
    logger.error(`Error in addProductService:${error}`);
    throw error;
  }
};

// export const addfinderAPI = async (productData: Product) => {
//   try {
//     logger.info(`Processing product data in service:${productData}`);
//     console.log(`productData :${productData}`)
//     const result = await addProductDAO(productData);
//     if (!result) {
//       logger.error("Product insertion failed in DAO");
//       throw new Error("Product insertion failed");
//     }

//     logger.info("Product added successfully in service");
//     return result;
//   } catch (error) {
//     logger.error(`Error in addProductService:${error}`);
//     throw error;
//   }
// };

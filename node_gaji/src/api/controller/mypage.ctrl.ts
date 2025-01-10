import {Request, Response} from 'express';
import logger from '../../logger';
import { uploadImageService } from 'api/service/mypage.service';


// 사용자 프로필 업데이트
export const uploadImage = {
    uploadFiles: async (req: Request, res: Response) => {

        try {
            const formData = req.files as Express.Multer.File[]; //업로드된 파일들

            console.log("갖고온 formData:", formData);

            


            
    
        if(!formData || formData.length === 0) {
            logger.error({"formData 파일을 받아오지 못했습니다.": formData});
    
            res.status(400).json({
                success: false,
                message: "formData 파일을 받아오지 못했습니다."
            });
    
            return;
        }
    
        const response = await uploadImageService.uploadFilesToStorage(formData);
    
        if(!response) {
            
            logger.error({"!response 값을 가져오지 못했습니다": response});
    
            res.status(400).json({
                success: false,
                message: "response 값을 가져오지 못했습니다."
            });
    
            return;
        }
    
        res.status(200).json({
            success: true,
            data: response,
            message: "전송 완료"
        })
    
        } catch (error) {
            logger.error({"uploadImage 500 오류": error});
            res.status(500).json({
                success: false,
                message: "500 uploadImage 오류",
            });
    
            return;
        }
}

}
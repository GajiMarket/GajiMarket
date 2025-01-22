import {Request, Response} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
import {logger} from '../../logger';
import { uploadImageService } from '../service/mypage.service';
import IMemberTbl from '../models/member_tbl';
import IPhoto from '../models/photo';

type loginType = Partial<IMemberTbl&IPhoto>;


// 사용자 프로필 이미지 업데이트
export const uploadImage = {
    /**
 * @openapi
 * /uploadimage:
 *   post:
 *     tags:
 *       - Mypage
 *     summary: 프로필 이미지 업로드
 *     description: 사용자가 프로필 이미지를 업로드합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profileImage:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: 업로드할 프로필 이미지 파일들
 *     responses:
 *       200:
 *         description: 프로필 이미지 업로드 성공
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */
    uploadFiles: async (req: Request, res: Response) => {

        try {
            const formData = req.files as Express.Multer.File[]; //업로드된 파일들
            const userNo = req.body.userNo

            console.log("갖고온 formData:", req.files);
            console.log("갖고온 userNo:", req.body);
            

            


            
    
        if(!formData || formData.length === 0) {
            logger.error("formData 파일을 받아오지 못했습니다:", {"formData":formData});
            logger.error({"userNo 파일을 받아오지 못했습니다": userNo});
    
            res.status(400).json({
                success: false,
                message: "formData 파일을 받아오지 못했습니다."
            });
    
            return;
        }
    
        const response = await uploadImageService.uploadFilesToStorage(formData, userNo);
        
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
            console.error("500 에러 발생",error);
            
            logger.error({"uploadImage 500 오류": error});
            res.status(500).json({
                success: false,
                message: "500 uploadImage 오류",
            });
    
            return;
        }
    },
/**
 * @openapi
 * /defaultimage:
 *   post:
 *     tags:
 *       - Mypage
 *     summary: 기본 프로필 이미지 설정
 *     description: 사용자의 프로필 이미지를 기본 이미지로 설정합니다.
 *     responses:
 *       200:
 *         description: 기본 프로필 이미지 설정 성공
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */
// 프로필 기본 이미지
    defaultProfileImage: async (req: Request, res: Response) => {

        try {
            
            const id = req.body.userNo;

            logger.debug({"갖고온 아이디": id})

            if(!id) {
                logger.error("아이디가 존재하지 않습니다.");
                res.status(400).json({
                    success: false,
                    message: "아이다가 존재하지 않습니다."
                });
            }

            const imagePath = await uploadImageService.profileDefaultService(id) as loginType;

            logger.debug({"갖고온 이미지": imagePath.image});

            res.status(200).json({
                success: true,
                imagePath,
                message: "이미지 불러오기 완료",
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: "internel Server error",
            })
        }
    },
/**
 * @openapi
 * /profileupdate:
 *   post:
 *     tags:
 *       - Mypage
 *     summary: 프로필 닉네임 변경
 *     description: 사용자가 프로필 닉네임을 업데이트합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 example: newnickname
 *                 description: 변경할 닉네임
 *     responses:
 *       200:
 *         description: 닉네임 업데이트 성공
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */
    proifleNickname: async(req: Request, res: Response) => {

        try {
            const key = process.env.TOKEN_KEY || "GajiMarket_login";
            const nick = req.body.data.nickname;
            const id = req.body.data.id;
            const token = req.body.data.token;

            logger.debug({"가져온 파라미터": nick});

            if(!nick) {
                logger.error("파라미터값을 가져오지 못했습니다.");
                res.status(400).json({
                    success: false,
                    message: "파라미터 값을 가져오지 못했습니다."
                });

                return;
            }

            const response = await uploadImageService.profileNickService(nick, id) as loginType;

            logger.debug({"DAO에서 갖고온 데이터": response});

            //사용자 정보 decoded
            const decoded = jwt.verify(token, key) as JwtPayload

            const setToken = jwt.sign({id: decoded.member_no, email: decoded.email, nickname: response.member_nick}, key, {expiresIn: '1h'});
        
            logger.debug({"생성된 토큰": token});

            res.status(200).json({
                success: true,
                nickName: response.member_nick,
                setToken,
                message: "반환 성공",
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error,
            })
        }
    }

}
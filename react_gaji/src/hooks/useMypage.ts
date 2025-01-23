import axios from 'axios';

const api: string = import.meta.env.VITE_API_LOCAL;

// const google: string = import.meta.env.VITE_GOOGLE_URL;

import.meta.env.MODE === 'production' ? `https://gajimarket-api-dot-winged-woods-442503-f1.du.r.appspot.com/map/product_preview` : `${api}/map/product_preview`

// id(userNo)도 formData에 들어가 있음
// 따로따로 보내려고 하면 formData가 빈 배열로 넘어감
export const imageUpload = async(formData: FormData): Promise<string | void> => {


    try {

        //formData는 log로 조회 불가능
        // console.log("현재 formData:", formData.get('profileImage'));

        // 반복문으로 데이터 조회
        let values = formData.values();

        for (const pair of values) {
            console.log(pair);
            
        }

        if(!formData) {
            
            console.error("imageUpload:데이터를 불러오지 못했습니다.");

            return;
            
        }

        const response = await axios.post( import.meta.env.NODE_ENV === 'production' ? `https://gajimarket-api-dot-winged-woods-442503-f1.du.r.appspot.com/mypage/uploadimage` : `${api}/mypage/uploadimage`, formData,
            {
            
            headers: {
                'Content-Type':'multipart/form-data'
            },
        });

        if(response.data.success === false && !response) {
            console.error("imageUpload: 데이터를 갖고오지 못했습니다.");
            
        }

        return response.data.data;

    } catch (error) {

        throw new Error("imageUpload: 서버와 연결도중 오류가 발생했습니다.");
    }
}

// 프로필 이미지
export const imagePath = async (userNo: number): Promise<string | void> => {

    try {
        if (!userNo) {
            console.error("유저 번호가 전달되지 못했습니다.", userNo);

            return;
            
        }

        console.log("유저 번호:", userNo);
        

        const response = await axios.post(import.meta.env.NODE_ENV === 'production' ? `https://gajimarket-api-dot-winged-woods-442503-f1.du.r.appspot.com/mypage/defaultimage` : `${api}/mypage/defaultimage`, {
            userNo,
        });

        const result = response.data.imagePath.image;

        return result;

    } catch (error) {

        throw new Error("500 에러 발생:");
    }
}

export const nicknameUpdate = async(loginToken: string ,userNo: string, nickname: string): Promise<{token: string, nickName: string}> => {

    try {
        const response = await axios.post(import.meta.env.NODE_ENV === 'production' ? `https://gajimarket-api-dot-winged-woods-442503-f1.du.r.appspot.com/mypage/profileupdate` : `${api}/mypage/profileupdate`, {
            data: {
                nickname: nickname,
                id: userNo,
                token: loginToken,
            },
        });

        console.log("파라미터 loginToken:", loginToken);
        console.log("파라미터 userNo:", userNo);
        console.log("파라미터 nickname:", nickname);
        

        if (!response.data.setToken) {
            throw new Error('토큰을 받아오지 못했습니다.')
        }

        // 새로운 토큰과 닉네임
        const result = {token: response.data.setToken, nickName: response.data.nickName }

        return result;

    } catch (error) {

        console.error('닉네임 변경 실패:', error);
        throw new Error();
        
    }
}




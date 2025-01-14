import axios from 'axios';

const api = `http://localhost:3000`;

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

        const response = await axios.post(`${api}/mypage/uploadimage`, formData,
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

        const response = await axios.post(`${api}/mypage/defaultimage`, {
            userNo,
        });

        const result = response.data.imagePath;

        return result;

    } catch (error) {

        throw new Error("500 에러 발생:");
    }
}


// export const updateNick = async (nickname: string, token: string): Promise<string | void> => {

//     try {

//         if (!nickname) {
//             console.log("파라미터를 받아오지 못했습니다.");

//             return;
            
//         }

//         const response = await axios.post(`${api}/mypage/updatenick`, {
//             nickname,
//             headers: {
//                 Authorization: {
//                     `Bearer: ${token}`
//                 }
//             }
//         });

//         if(!response) {
//             console.log("값을 반환 하지 못했습니다:", response.data.userNick);

//             return;
            
//         }

//         const result = response.data.userNick;

//         return result;
//     } catch {

//         throw new Error("500 에러 발생<닉네임 업데이트>:");
//     }
// }
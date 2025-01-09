
import axios from 'axios';

const api: string = `http://localhost:3000` 

//로그인 함수


export const login = async (formData: Record<string, string>): Promise<{isChecked:boolean, data: string}> => {


    try {
        console.log(formData);
        console.log(formData.id);
        console.log(formData.password);
        
        

        const response = await axios.post(`${api}/auth/login`, {
            data:{
                id: formData.id,
                pw: formData.password,
            },
            
        });

        

        if(response.status === 500 || response.status === 400) {

            throw Error(`서버 에러: ${response.status}`);
        }
        
        const results = response.data;
        
        console.log("results.data 값", results.data);
        console.log("results.success 값", results.success);
        
        

        return {isChecked: results.success, data: results.data};
        


    } catch(error) {

        console.error(error);

        throw new Error('서버와 연결하는데 오류가 발생했습니다.');
        
    }

};

// 토큰 유효성 검증(쿠키 전용)
export const tokenValidate = async ():Promise<boolean> => {

    try {
        const response = await axios.get(`${api}/auth/tokenvali`, {
            withCredentials:true,
        });

        if(!response.data.success) {


            console.log("토큰이 일치하지 않습니다.");
            return false;
            
        }

        return true;

    } catch (error) {

        
        console.error('토큰 검증 오류:', error);
        throw new Error("tokenValidate 함수 실행 중 문제가 발생했습니다.")

        
    }
}

// token전송, 디코딩 시켜 사용자 정보 전송
export const getUserInfo = async (token: string) => {

    try {
        const response = await axios.get(`${api}/auth/getuserinfo`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        return response.data;

    } catch (error) {

        console.error('유저 정보 요청 실패:', error);
        return null;
        
    }
}


//인가 코드를 전송하고 토큰을 발급받는다.
export const getAccessToken = async (code: string): Promise<string | undefined> => {

    try {

        const response = await axios.post(`${api}/auth/kakaotoken`, {
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                code: code,
            },
            withCredentials: true,
        });

        // 토큰 받아옴
        const accessToken = response.data.accessToken;
        console.log("카카오 accessToken:", accessToken);

        if(!accessToken) {
            console.log("getAccessToken: accessToken을 가져오는데 실패했습니다.");
            
        }


        return accessToken;
        

    } catch(error) {

        console.error("카카오 에러:",error);
        return undefined;
        
    }
}

//사용자 프로필(닉네임) 업데이트
export const nicknameUpdate = async(token: string, nickname: string) => {

    try {
        const response = await axios.post(`${api}/auth/profileupdate`, {
            headers: {
                Authorizaion: `Bearer ${token}`
            },
            data: {
                nickname: nickname,
            },
        });

        if (!response.data.token) {
            throw new Error('토큰을 받아오지 못했습니다.')
        }

        const newtoken = response.data.token;

        return newtoken;

    } catch (error) {

        console.error('닉네임 변경 실패:', error);
        throw error;
        
    }
}



// 사용자 정보 받아오기
export const kakaoUserInfo = async (token: string): Promise<{success: boolean, userInfo: Record<string, any>}> => {

    try {
        // id, email, nickname은 기본값
        const response = await axios.post(`${api}/auth/kakaoinfo`, {
            headers: {
                Authorization: `Beaer ${token}`
            }
        });

        if (!token) {

            console.log('token 전송 실패');
            
        }

        // 회원가입 완료시 status값
        const result = {userInfo:{email: response.data.data.email, nickname: response.data.data.nickname}, success: response.data.success};
       
        return result

    } catch (error) {

        console.error(error);
        

        throw new Error('kakaoUserInfo: 사용자 정보 함수 실행중 오류 발생')
    }
}

// interface KakaoAccount {
//     email: string;
//     profile: {
//         nickName: string;
//         profile_image: string;
//     };
// }

// interface Properties {
//     nickname: string;
//     profile_image: string;
// }

// interface KakaoUserInfo {
//     id: number;
//     properties: Properties;
//     kakao_account: KakaoAccount
// }


// export const kakaoUserInfo = async (token: string): Promise<KakaoUserInfo | undefined> => {

//     try {

//         if (!token) {
//             console.log("kakaoUserInfo: token을 갖고오는데 실패했습니다.");
//             return;
//         }

//         const info = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         // 사용자 정보 데이터
//         const response = info.data;

//         return response;

//     } catch(error) {

//         console.error('kakaoUserInfo: 함수 실행중 오류 발생');
        
//     }

// }
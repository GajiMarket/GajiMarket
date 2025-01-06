
import axios from 'axios';

const api: string = `http://localhost:3000` 

//로그인 함수
export const login = async (data: Record<string, string>): Promise<{loginCheck: boolean, loginData: string}> => {


    try {

        const response = await axios.post(`${api}/auth/login`, {
            header: {
                "Content-Type": "application/json"
            },
            data: {
                id: data.id,
                pw: data.pw
            }
        });

        if(response.status === 500) {

            throw Error(`서버 에러: ${response.status}`);
        }

        const results = await response.data;

        return results;

    } catch(error) {

        console.error(error);

        throw new Error('서버와 연결하는데 오류가 발생했습니다.');
        
    }

};


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

// 사용자 정보 받아오기
export const kakaoUserInfo = async (data: Record<string, string>): Promise<void> => {

    try {
        // id, email, nickname은 기본값
        const response = await axios.post(`${api}/auth/kakaoinfo`, {
            data: {
                id: data.id,
                pw: data.pw,
                email: data.email,
                phone: data.phone,
                nickname: data.nickName,
                name: data.name,
                addr: data.addr,
                birth: data.birth,
            },
        });

        if (!data) {

            console.log('formData 전송 실패');
            
        }

        // 회원가입 완료시 status값
        const result = response.status

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
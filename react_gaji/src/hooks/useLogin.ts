
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


export const getAccessToken = async (token: string): Promise<void> => {

    try {

        const response = await axios.post(`${api}/auth/kako`, {
            authorizationCode: token,
            headers: {
                "Content-Type": "application/json",
            },
        });

        const accessToken = response.data.accessToken;
        console.log("카카오 accessToken:", accessToken);
        

    } catch(error) {

        console.error("카카오 에러:",error);
        
    }
}
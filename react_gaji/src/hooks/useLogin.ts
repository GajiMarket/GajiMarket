
import axios from 'axios';

const api: string = `http://localhost:3000` 

//로그인 함수
export const login = async (data: Record<string, string>): Promise<{loginCheck: boolean, loginData: string}> => {


    try {

        const response = await fetch(`${api}/auth/login`, {
            method: 'POST',
            headers: {"Content-Type": "aplication/json"},
            body: JSON.stringify({data}),
        });

        if(!response.ok) {

            throw new Error(`서버 에러: ${response.status}`);
        }

        const results = await response.json();

        return results;
    } catch(error) {

        console.error('서버와 연결하는데 오류가 발생했습니다.', error);

        throw error;
        
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
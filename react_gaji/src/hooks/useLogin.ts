
const api: string = `http://localhost:3000` 

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
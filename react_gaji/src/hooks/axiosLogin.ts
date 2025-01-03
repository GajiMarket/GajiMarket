import axios from 'axios';

export const login = async (id: string, password: string): Promise<string | undefined> => {
    try {
        // 요청값은 
        const response = await axios.post('http://localhost:3000/login', {
            data: {
                id: id,
                password: password,
            }
        });

        if(response.status === 200) {

            console.log('로그인 성공');
            
        } else {
            console.log('로그인 실패');
        }

        return response.data;

    } catch (error) {
        console.log('로그인 실패');
    }
};

export const login1 = async (id: string, password: string): Promise<string | undefined> => {

    try {
        //요청값은 무조건 JSON으로 보내짐
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                id: id,
                password: password,
            }),
        });

        if(!response.ok) {
            throw new Error('로그인 실패');
        }

        return response.json();
        
    } catch (error) {
        console.error('로그인 실패:', error);
        
        throw error;
    }
}

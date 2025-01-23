import loginStore from "../utils/loginStore";
import axios from "axios";

// interface KeywordResponse {
//     success: boolean;
//     message: string;
//     data: {
//         keyword_name: string[];
//     };
// }
const api = axios.create({
    baseURL: import.meta.env.VITE_NODE_URI,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const sendKeyword = () => {
    const userNo = loginStore.getState().userNo;

    const getKeywords = async (userNo: number) => {
        try {
            const response = await api.get(`/api/mypage_keyword/${userNo}`);
            // console.log("받아온 유저 데이터:", response.data);
            return response.data; // 서버 응답 데이터 반환
        } catch (error) {
            console.error("키워드 조회 실패:", error);
            alert("키워드 조회 중 오류가 발생했습니다.");
            return undefined;
        }
    };

    const postKeywords = async (keywords: string[]) => {

        try {
            if (!userNo) {
                alert("로그인이 필요합니다.");
            }
            const data = { userNo, keywords }

            const response = await api.post('/api/mypage_keyword', data);
            console.log("서버에서 받은 데이터:", response.data);

            if (response.status === 200) {
                alert("키워드가 성공적으로 저장되었습니다!");
            } else {
                alert("키워드 저장에 실패했습니다.");
            }
        } catch (error) {
            console.error("키워드 저장 실패:", error);
            alert("키워드 저장 중 오류가 발생했습니다.");
        }
    };

    return { getKeywords, postKeywords };
}
import { useState } from "react";
import loginStore from "../utils/loginStore";
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_NODE_URI,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const sendKeyword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const postKeywords = async (keywords: string[]) => {
        setLoading(true);
        setError(null);

        try {
            const userNo = loginStore.getState().userNo;
            if (!userNo) {
                alert("로그인이 필요합니다.");
                return;
            }
            const data = { userNo, keywords }

            console.log("user:", userNo);
            console.log("keyword:", data);

            const response = await api.post('/api/mypage_keyword', data);
            console.log(response.data);

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

    return { postKeywords };
}
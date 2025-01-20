import { useState } from "react";
import loginStore from "../utils/loginStore";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_NODE_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

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
        return null; // 유저가 없는 경우 null 반환
      }

      const data = { userNo, keywords };

      const response = await api.post("/api/mypage_keyword", data);

      if (response.status === 200) {
        alert("키워드가 성공적으로 저장되었습니다!");
        return response.data; // 응답 데이터 반환
      } else {
        alert("키워드 저장에 실패했습니다.");
        return null;
      }
    } catch (error) {
      console.error("키워드 저장 실패:", error);
      setError("키워드 저장 중 오류가 발생했습니다.");
      return null;
    } finally {
      setLoading(false); // 항상 로딩 상태 종료
    }
  };

  const getKeywords = async (): Promise<string[] | null> => {
    setLoading(true);
    setError(null);

    try {
      const userNo = loginStore.getState().userNo;
      if (!userNo) {
        alert("로그인이 필요합니다.");
        return null;
      }

      const response = await api.get(`/api/mypage_keyword`, {
        params: { userNo }, // userNo를 쿼리 파라미터로 전달
      });

      console.log("get keywords:", response.data.data);
      return response.data.data; // 키워드 배열 반환
    } catch (error) {
      console.error("키워드 조회 실패:", error);

      // 오류 메시지를 상태로 설정
      setError("키워드 조회 중 오류가 발생했습니다.");

      // null 반환
      return null;
    } finally {
      setLoading(false); // 항상 로딩 상태 종료
    }
  };

  return { postKeywords, getKeywords, loading, error };
};
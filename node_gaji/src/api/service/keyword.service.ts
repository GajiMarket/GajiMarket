import { keywordDAO } from "../DAO/keyword.dao";

export const keywordService = async (userNo: number, keywords: string[]) => {
    if (!Array.isArray(keywords) || keywords.length === 0) {
        throw new Error("키워드는 배열 형식이어야 하며 비어있을 수 없습니다.");
    }

    const result = await keywordDAO.addKeywords(userNo, keywords);
    return result;
}

export const getUserKeywords = async (userNo: number) => {
    if (!userNo) {
        throw new Error("유효한 사용자 번호가 필요합니다.")
    }

    const keywords = await keywordDAO.getKeywordsByUser(userNo);
    return keywords;
}

export const deleteUserKeywords = async (userNo: number, keyword: string) => {
    const updatedKeywords = await keywordDAO.deleteKeywordsByUser(userNo, keyword);
    return updatedKeywords;
}
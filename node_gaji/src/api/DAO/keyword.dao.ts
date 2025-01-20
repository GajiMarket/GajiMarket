import { db, schema } from "../../config/dbConfig";

export const keywordDAO = {
   /**
   * 키워드 추가 (갱신)
   * @param userNo 사용자 번호
   * @param keywords 추가할 키워드 배열
   * @returns 갱신된 키워드 목록
   */
   addKeywords: async (userNo: number, keywords: string[]) => {
    // 현재 키워드 갱신
    const query = `
      UPDATE ${schema}.keyword
      SET keyword_name = array_cat(keyword_name, $1::text[]), created_at = $2
      WHERE member_no = $3
      RETURNING keyword_name;
    `;
    const createdAt = new Date();
    const formattedKeywords = `{${keywords.join(",")}}`; // PostgreSQL 배열 형식 변환

    const result = await db.query(query, [formattedKeywords, createdAt, userNo]);

    // 기존 키워드가 없는 경우 새로 추가
    if (result.rowCount === 0) {
      const insertQuery = `
        INSERT INTO ${schema}.keyword (member_no, keyword_name, created_at)
        VALUES ($1, $2::text[], $3)
        RETURNING keyword_name;
      `;
      const insertResult = await db.query(insertQuery, [userNo, formattedKeywords, createdAt]);
      return insertResult.rows[0];
    }

    return result.rows[0];
  },

  /**
   * 사용자 키워드 조회
   * @param userNo 사용자 번호
   * @returns 키워드 목록
   */
  getKeywordsByUser: async (userNo: number) => {
    const query = `
      SELECT keyword_id, keyword_name, created_at
      FROM ${schema}.keyword
      WHERE member_no = $1;
    `;
    const { rows } = await db.query(query, [userNo]);
    return rows;
  },

  /**
   * 특정 키워드 삭제
   * @param userNo 사용자 번호
   * @param keyword 삭제할 키워드
   * @returns 삭제 후 키워드 배열
   */
  deleteKeywordsByUser: async (userNo: number, keyword: string) => {
    const query = `
      UPDATE ${schema}.keyword
      SET keyword_name = array_remove(keyword_name, $1)
      WHERE member_no = $2
      RETURNING keyword_name;
    `;
    const { rows } = await db.query(query, [keyword, userNo]);
    return rows[0]?.keyword_name || [];
  },
};
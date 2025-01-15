import { db, schema } from "../../config/dbConfig";
// import {QueryResult} from 'pg';
import IMemberTbl from '../models/member_tbl'
import IPhoto from '../models/photo'
import { logger } from '../../logger';

type loginType = Partial<IMemberTbl & IPhoto>;

// 폴더 별로 역할을 나눌 경우
export const login = async (id: string, password: string): Promise<loginType> => {

  console.log("가지고 온 파라미터:", id, "", password);


  const response = await db.query(`SELECT member_no, member_id, member_nick, member_pwd, member_email FROM ${schema}.member_tbl WHERE member_id = $1 AND member_pwd = $2`, [String(id), String(password)]);

  const hashPassword = response.rows[0] as loginType;

  console.log("내가 불러온 정보:", hashPassword.member_pwd as string);

  return hashPassword;
};

export const pwCheckDAO = async (id: string): Promise<loginType> => {
  console.log("가지고 온 파라미터:", id);

  const response = await db.query(
    `SELECT member_pwd FROM ${schema}.member_tbl WHERE member_id = $1`,
    [id]
  );

  console.log("내가 가져온 비밀번호:", response.rows[0] as loginType);

  return response.rows[0] as loginType;
};

export const signUpDAO = async (
  formData: Record<string, string>,
  password: string
): Promise<boolean | void> => {
  console.log("DAO받아온값:", formData, "DAO패스워드:", password);

  if (!formData || !password) {
    logger.error("DAO: 파라미터 전달이 실패했습니다.");
    return;
  }

  const phone = Number(formData.phone);
  const birth = Number(formData.birth);

  const response = await db.query(
    `INSERT INTO ${schema}.member_tbl (member_id, member_pwd, member_phone, member_email, member_nick, member_name, member_addr, member_birth, member_login) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 0)`,
    [
      formData.id,
      password,
      phone,
      formData.email,
      formData.nickName,
      formData.name,
      formData.postcode,
      birth,
    ]
  );

  if (response) {
    logger.info("데이터 입력 성공");
    logger.info({ "저장된 데이터:": response.rows[0] as loginType });
  }

  return true;
};

// 카카오는 1번
export const saveOrUpdateUser = async (
  formData: Record<string, string>,
  password: string
): Promise<loginType> => {
  if (!formData) {
    throw new Error("saveOrUpdateUser: formData값을 받아오지 못했습니다.");
  }

  console.log("DAO가져온 값:", formData);

  const phone = Number(formData.phone);
  const birth = Number(`${formData.year}${formData.month}${formData.day}`);
  console.log("birth:", birth);
  // const postcode =

  const response = await db.query(
    `INSERT INTO ${schema}.member_tbl (member_id, member_pwd, member_phone, member_email, member_nick, member_name, member_addr, member_birth, member_login) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 1) ON CONFLCT (member_id) DO UPDATE SET member_email = $4, member_nick = $5 RETURNING member_id`,
    [
      formData.id,
      password,
      phone,
      formData.email,
      formData.nick,
      formData.name,
      formData.addr,
      birth,
    ]
  );

  return response.rows[0] as loginType;
};

export const idCheckDAO = async (id: string): Promise<loginType | void> => {
  try {
    const response = await db.query(
      `SELECT member_id FROM ${schema}.member_tbl WHERE member_id = $1`,
      [id]
    );

    const dataId = response.rows[0];

    console.log("데이터베이스 결과", dataId.member_id);

    if (dataId === id) {
      console.log(dataId.member_id);

      logger.error("아이디가 중복 되었습니다.");
      return dataId;
    }

    return dataId.member_id;
  } catch (error) {
    logger.error(error);
    return;
  }
};

// 수업에 배운대로 할경우

// export const login1 = async (id:string, password: string): Promise<IMemberTbl> => {

//     const query = `SELECT member_id, member_pwd FROM ${schema}.member_tbl WHERE member_id = $1 AND member_pwd = $2`;

//     try {

//         const result: QueryResult = await db.query(query, [id, password]);

//         return result.rows[0] as IMemberTbl;
//     } catch (error) {
//         console.error('서버에서 로그인 실패:', error);
//         throw new Error(error as string);

//     }
// }

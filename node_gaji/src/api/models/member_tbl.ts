/**
 * @openapi
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       required:
 *         - member_no
 *         - member_id
 *         - member_pwd
 *         - member_phone
 *         - member_email
 *         - created_at
 *         - member_login
 *         - accesstoken
 *         - member_nick
 *         - member_name
 *         - member_addr
 *         - member_birth
 *       properties:
 *         member_no:
 *           type: integer
 *           description: 회원 고유 번호
 *           example: 1
 *         member_id:
 *           type: string
 *           description: 회원 아이디
 *           example: johndoe123
 *         member_pwd:
 *           type: string
 *           description: 회원 비밀번호 (암호화됨)
 *           example: hashedpassword123
 *         member_phone:
 *           type: integer
 *           description: 회원 전화번호
 *           example: 821012345678
 *         member_email:
 *           type: string
 *           description: 회원 이메일 주소
 *           example: johndoe@example.com
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: 회원 가입일
 *           example: "2025-01-23T12:00:00Z"
 *         member_login:
 *           type: integer
 *           description: 로그인 여부를 나타내는 플래그 (0: 로그아웃, 1: 로그인)
 *           example: 1
 *         accesstoken:
 *           type: string
 *           description: 회원의 액세스 토큰
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         member_nick:
 *           type: string
 *           description: 회원 닉네임
 *           example: "JohnDoe"
 *         member_name:
 *           type: string
 *           description: 회원 이름
 *           example: "John Doe"
 *         member_addr:
 *           type: string
 *           description: 회원 주소
 *           example: "Seoul, South Korea"
 *         member_birth:
 *           type: integer
 *           description: 회원 생년월일 (YYYYMMDD 형식)
 *           example: 19900101
 */
interface IMemberTbl {
    member_no: number | string;
    member_id: string;
    member_pwd: string;
    member_phone: number;
    member_email: string;
    created_at: Date;
    member_login: number;
    accesstoken: string;
    member_nick: string;
    member_name: string;
    member_addr: string;
    member_birth: number;
}

export default IMemberTbl;
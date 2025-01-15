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
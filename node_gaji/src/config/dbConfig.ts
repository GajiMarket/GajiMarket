import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.CODELAB_HOST,
    port: Number(process.env.CODELAB_PORT),
    database: process.env.CODELAB_DB,
    user: process.env.CODELAB_USER,
    password: process.env.CODELAB_PASSWORD,

}

 export const db = new pg.Pool(dbConfig);
 export const schema = process.env.CODELAB_SCEHMA;





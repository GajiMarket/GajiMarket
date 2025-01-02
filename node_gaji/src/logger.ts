import pino from 'pino';
import fs from 'fs';
import path from 'path'
import dotenv from 'dotenv';
import dayjs from 'dayjs';

dotenv.config();

const logDir: string = path.resolve('./logs');
const logFile: string = path.join(logDir, 'app.log');

// const now = new Date();

// const year = now.getFullYear(); // 년도 4자리
// const month = String(now.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작, +1 붙여줌, 한자리만 있을때 앞에 0, 두 자리면 없음)
// const day = String(now.getDate()).padStart(2, '0');
// const hours = String(now.getHours()).padStart(2, '0');
// const minutes = String(now.getMinutes()).padStart(2, '0');
// const seconds = String(now.getSeconds()).padStart(2, '0');

const formattedDate = dayjs().format('YYYY-MM-DD HH:mm:ss');



if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

//로그를 파일로 저장
// const logStream: DestinationStream = pino.destination(logPath);

// console.log(logStream);

const logLevel: string = process.env.LOG_LEVEL || 'debug';


const logger = pino({
    level: logLevel, // 로그 레벨 설정: 'fatal', 'error', 'warn', 'info', 'debug', 'trace'
    // timestamp: () => `,"time": "${new Date().toISOString()}"`,
    // timestamp: () => `, "time": "${year}-${month}-${day} ${hours}:${minutes}:${seconds}"`,
    timestamp: () => `, "time": "${formattedDate}"`,
    transport:
    {
        targets: [
            // {
            //     target: 'pino/file', // 파일 기록
            //     options: {
            //         level: logLevel,
            //         destination: logFile,
            //     },
            // },
            {
                target: 'pino-pretty', // 터미널 출력용
                options: {
                    level: logLevel,
                    colorize: true, // 색상
                    translateTime: 'yyyy-mm-dd HH:MM:ss', // 시간 포멧
                    ignore: 'pid, hostname', // 무시 항목
                },
            },
        ],
    },
});


//logger 테스트
// logger.debug('This is a debug log');
// logger.info('This is a info log');
// logger.error('This is a error log');

export default logger;
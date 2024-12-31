import pino from 'pino';

const logger = pino({
    level: process.env.LOG_LEVEL || 'info', // 로그 레벨 설정: 'fatal', 'error', 'warn', 'info', 'debug', 'trace'
    transport: process.env.NODE_ENV !== 'production' ?
    {
        target: 'pino-pretty',
        options: {
            colorize: true, // 색상
            translateTime: 'yyyy-mm-dd HH:MM:ss', // 시간 포맷
        },
    }
    : undefined // 프로덕션에서는 JSON 포맷 유지
});

export default logger;
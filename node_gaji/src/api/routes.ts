import { Express } from 'express';
import path from './pathFinder.index';
import products from './product.index';
import Product_preview from './map.index';
import { userLocation } from './controller/userLocation.ctrl';
import member from './member.index';
import chatRoutes from './chat.index';
import mypage from '../api/mypage.index';
import notificationRoutes from "../api/notifications.index"; // 알림 라우트 추가
import mypageLoveRoutes from "./mypage_love.index";
import productadd from '../api/productcdd.index';
import mypageKeyword from './mypage_key.index';
import mypageSellRoutes from './mypage_sell.index'; // 판매내역 라우트 추가
import mypageBuyRoutes from './mypage_buy.index'; // 구매내역 라우트 추가

const mountRoutes = (app: Express) => {

    /**
     * @openapi
     * /auth:
     *   tag:
     *     - auth
     *   description: 회원 인증 관련 API
     */
    app.use('/auth', member);

    /**
     * @openapi
     * /map:
     *   description: 지도 관련 API
     */
    app.use('/map', Product_preview);
    /**
     * @openapi
     * /product:
     *   description: 상품 관련 API
     */
    app.use('/product', products)
    /**
     * @openapi
     * /navigation:
     *   description: 경로 탐색 관련 API
     */
    app.use('/navigation', path)
    /**
     * @openapi
     * /:
     *   post:
     *     tags:
     *      - Location
     *     description: 사용자 위치 정보를 저장
     */
    app.post('/', userLocation);

    /**
     * @openapi
     * /api:
     *   description: 채팅 관련 API
     */
    app.use('/api', chatRoutes);
    /**
     * @openapi
     * /mypage:
     *   description: 마이페이지 관련 API
     */
    app.use('/mypage', mypage);
    /**
     * @openapi
     * /notifications:
     *   description: 알림 관련 API
     */
    // 알림 관련 라우트
    app.use("/notifications", notificationRoutes);
    /**
     * @openapi
     * /mypage_love:
     *   description: 관심 목록 관련 API
     */
    // 관심목록 라우트
    app.use("/mypage_love", mypageLoveRoutes);
    /**
     * @openapi
     * /use:
     *   description: 상품 추가 관련 API
     */
    app.use('/use', productadd);
    /**
     * @openapi
     * /api/mypage_sell:
     *   description: 판매 내역 관련 API
     */
    // 판매내역 라우트
    app.use('/api/mypage_sell', mypageSellRoutes);
    /**
     * @openapi
     * /api/mypage_buy:
     *   description: 구매 내역 관련 API
     */
    // 구매내역 라우트
    app.use('/api/mypage_buy', mypageBuyRoutes);
    /**
     * @openapi
     * /api/mypage_keyword:
     *   description: 키워드 알림 관련 API
     */
    // 키워드 알림 라우트
    app.use('/api/mypage_keyword', mypageKeyword)
}

export default mountRoutes;

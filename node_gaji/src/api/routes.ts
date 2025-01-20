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
    app.use('/auth', member);

    app.use('/map', Product_preview);

    app.use('/product', products)

    app.use('/navigation', path)

    app.post('/', userLocation);

    app.use('/api', chatRoutes);

    app.use('/mypage', mypage);

    // 알림 관련 라우트
    app.use("/notifications", notificationRoutes);

    // 관심목록 라우트
    app.use("/mypage_love", mypageLoveRoutes);

    app.use('/use', productadd);

    // 판매내역 라우트
    app.use('/api/mypage_sell', mypageSellRoutes);

    // 구매내역 라우트
    app.use('/api/mypage_buy', mypageBuyRoutes);

    // 키워드 알림 라우트
    app.use('/api/mypage_keyword', mypageKeyword)
}

export default mountRoutes;

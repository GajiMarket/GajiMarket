import { Express, Router } from 'express'
import path from './pathFinder.index';
import products from './product.index';
import Product_preview from './map.index';
import { userLocation } from './controller/userLocation.ctrl';
import member from './member.index';
import chatRoutes from './chat.index';
import mypage from '../api/mypage.index';
import notificationRoutes from "../api/notifications.index"; // 알림 라우트 추가



const mountRoutes = (app: Express) => {

    app.use('/auth', member);

    app.use('/map', Product_preview)

    app.use('/product', products)
    app.use('/navigation', path)

    app.post('/', userLocation)

    app.use('/api', chatRoutes);

    app.use('/mypage', mypage);

    // 알림 관련 라우트
    app.use("/notifications", notificationRoutes);
    

}

export default mountRoutes;
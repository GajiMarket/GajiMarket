// import { getNearbyProducts } from '../DAO/product_preview.dao';

// const fetchNearbyProducts = async (req: Request, res: Response) => {
//   const { longitude, latitude } = req.query;

//   if (!longitude || !latitude) {
//     return res.status(400).json({ error: 'Longitude and latitude are required' });
//   }

//   try {
//     const products = await getNearbyProducts(Number(longitude), Number(latitude));
//     res.status(200).json({ success: true, data: products });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
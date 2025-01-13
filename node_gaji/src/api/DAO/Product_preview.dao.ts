import { db, schema } from '../../config/dbConfig';
import { IProduct } from '../models/product';

const formatInterval = (interval: { days: number; hours: number; minutes: number }): string => {
  const parts: string[] = [];
  if (interval.days) parts.push(`${interval.days}일`);
  if (interval.hours) parts.push(`${interval.hours}시간`);
  if (interval.minutes) parts.push(`${interval.minutes}분`);
  return parts.length > 0 ? parts.join(' ') + '전' : '방금전';
};

// 데이터베이스에서 상품 리스트를 가져오는 함수
export const getProductPreviews = async (): Promise<IProduct[]> => {
  try {
    const response = await db.query(
      `SELECT 
        product_id, 
        title, 
        description, 
        sell_price, 
        status, 
        created_at, 
        view_count, 
        ST_X(sell_location::geometry) AS longitude, 
        ST_Y(sell_location::geometry) AS latitude, 
        member_no,
        age(NOW(), created_at) AS time_elapsed
      FROM ${schema}.product;
      `);
    if (response.rows.length === 0) {
      throw new Error('No products found');
    }

    const formattedRows = response.rows.map((row) => ({
      ...row,
      time_elapsed: formatInterval(row.time_elapsed),
    }));

    return formattedRows as IProduct[];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products from the database');
  }
};

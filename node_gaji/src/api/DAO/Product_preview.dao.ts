import {db, schema} from '../../config/dbConfig'
import {IProduct} from '../models/product'

export const Product_preview = async (): Promise<IProduct> => {

    const response =  await db.query(`SELECT * FROM ${schema}.product`);


    if (response.rows.length === 0) {
        throw new Error('No products found');
      }

    return response.rows as IProduct[];

}

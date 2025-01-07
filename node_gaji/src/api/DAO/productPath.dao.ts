import { db, schema } from '../../config/dbConfig';
import { IProduct } from '../models/product'

export const getProducts = async (lng: number, lat: number, distance: number = 500): Promise<IProduct[]> => {
    const response = `
        SELECT * FROM ${schema}.product AS 
    `

};
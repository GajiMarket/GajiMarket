import {create} from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';

interface IProductProps {
    image: string | null;
    setImage:(image: string) => void; 

}
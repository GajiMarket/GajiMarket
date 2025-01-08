import {devtools, persist} from 'zustand/middleware'
import { create } from 'zustand'
import { PersistStorage } from 'zustand/middleware';

interface LoginProps {
    // formData: Record<string, string>;
    isAuthenticated: boolean;
    token: string | null;
    formData: Record<string, string>;
    setFormData: (field: string, value: string) => void;
    loginMethod: (token: string) => void;
    logoutMethod: () => void;
}

interface SessionStorage {
    getItem: (name: string) => string | null;
    setItem: (name: string, value: string) => void;
    removeItem: (name: string) => void;

    //아래는 기능상 동일한 기능, 시그니처 정의
    // getItem(name: string): string | null;
    // setItem(name: string, value: string): void;
    // removeItem(name: string): void;
}


// getItem: (token) => sessionStorage.getItem(token) as string, // 세션 스토리지에서 가져오기
// setItem: (token, value) => sessionStorage.setItem(token, value), // 세션 스토리지에 저장
// removeItem: (token) => sessionStorage.removeItem(token), // 세션 스토리지에서 제거거

// const sessionStorageProvider: SessionStorage = {
//     getItem: (name: string): string | null => sessionStorage.getItem(name),
//     setItem: (name: string, value: string): void => sessionStorage.setItem(name, value),
//     removeItem: (name: string) => sessionStorage.removeItem(name)
// }


// token 저장
//
const loginStore = create<LoginProps>()(
        persist((set) => ({
            isAuthenticated: false,
            token: null,
            formData: {id: '', password: ''},
            setFormData: (field: string, value: string) => set((state) => ({ formData: {...state.formData, [field]: value}})),
            loginMethod: (token) => set({ isAuthenticated: true, token }),
            logoutMethod: () => set({ isAuthenticated: false, token: null }),
        }),

        {
            name: 'login-storage',
            storage: {
                getItem: (name: string) => {
                    const value = sessionStorage.getItem(name);
                    return value ? JSON.parse(value) : null;
                },
                setItem: (name: string, value: {}) => {
                    sessionStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: (name: string) => sessionStorage.removeItem(name)
            } as PersistStorage<string>
        }
    )
        
);

export default loginStore;
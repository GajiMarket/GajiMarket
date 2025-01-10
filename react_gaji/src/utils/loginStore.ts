import {persist} from 'zustand/middleware'
import { create } from 'zustand'
import { PersistStorage } from 'zustand/middleware';

// 사용할 타입 정의
interface LoginProps {
    isAuthenticated: boolean;
    token: string | null;
    nickname: string | null;
    setNickname: (nickname: string) => void;
    loginMethod: (token: string) => void;
    logoutMethod: () => void;
}


    // formData: Record<string, string>;
    // setFormData: (nickname: string) => void;
    // formData: Record<string, string>;
    // setFormData: (field: string, value: string) => void;

// 테스트용 사용안함
// interface SessionStorage {
//     getItem: (name: string) => string | null;
//     setItem: (name: string, value: string) => void;
//     removeItem: (name: string) => void;

    //아래는 기능상 동일한 기능, 시그니처 정의
    // getItem(name: string): string | null;
    // setItem(name: string, value: string): void;
    // removeItem(name: string): void;
// }


// getItem: (token) => sessionStorage.getItem(token) as string, // 세션 스토리지에서 가져오기
// setItem: (token, value) => sessionStorage.setItem(token, value), // 세션 스토리지에 저장
// removeItem: (token) => sessionStorage.removeItem(token), // 세션 스토리지에서 제거거

// const sessionStorageProvider: SessionStorage = {
//     getItem: (name: string): string | null => sessionStorage.getItem(name),
//     setItem: (name: string, value: string): void => sessionStorage.setItem(name, value),
//     removeItem: (name: string) => sessionStorage.removeItem(name)
// }

//  setFormData: (field: string, value: string) => set((state) => ({ formData: {...state.formData, [field]: value}})),


// token 저장
// logoutMethod: 로그아웃시 false로 바꾸고 token을 null로 변경
// loginMethod: 함수 실행 후 true로 바꾸고 서버에서 갖고온 token값 저장
const loginStore = create<LoginProps>()(
        persist((set) => ({
            isAuthenticated: false,
            token: null,
            nickname: null,
            setNickname: (nickname) => set({nickname}),
            loginMethod: (token) => set({ isAuthenticated: true, token }),
            logoutMethod: () => set({ isAuthenticated: false, token: null }),
        }), // 여기까지 초기화

        { // 세션에 저장할 키이름과 storage 설정
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
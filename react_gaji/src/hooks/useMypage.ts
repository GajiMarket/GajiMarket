import axios from 'axios';

const api = `http://localhost:3000`;

export const imageUpload = async(data: FormData): Promise<string | void> => {

    try {
        if(!data) {
            console.error("imageUpload:데이터를 불러오지 못했습니다.");

            return;
            
        }

        const response = await axios.post(`${api}/product/imageupload`, data, {
            headers: {
                'Cotnet-Type': 'multipart/form-data',
            },
        });

        if(response.data.success === false && !response) {
            console.error("imageUpload: 데이터를 갖고오지 못했습니다.");
            
        }

        return response.data.data.image;

    } catch (error) {

        throw new Error("imageUpload: 서버와 연결도중 오류가 발생했습니다.");
    }
}
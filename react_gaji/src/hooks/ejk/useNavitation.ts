import { useState, useEffect } from "react";
import { IPathResponse, sendPathData } from "../../api/pathFinder.api";

export const usePathData = () => {
    const [pathData, setPathData] = useState<IPathResponse | null>(null); // state에 pathdata 저장
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getApiData = async () => {
        try {
            const response = await sendPathData(); // API 결과를 가져옴
            setPathData(response) // state에 response값 저장
            // console.log("Response Data:", response.features);
        } catch (error) {
            setError("path Data를 불러오는데 실패했습니다.");
        } finally {
            setLoading(false); // 실패시 받아오기를 false
        }
    };

    useEffect(() => {
        getApiData();
    }, [])

    return { pathData, loading, error }; // 각 변수 반환
};
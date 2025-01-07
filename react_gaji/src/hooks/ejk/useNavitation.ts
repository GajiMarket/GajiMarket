import { useState } from "react";
import { getPathFinder, IPathResponse } from '../../api/pathFinder.api';

const usePathData = () => {
    const [path, setPath] = useState<number[][]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getPath = async (start: [number, number], end: [number, number]) => {
        setLoading(true);
        setError(null);

        try {
            const response: IPathResponse = await getPathFinder(start, end);
            setPath(response.coordinates);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    return { path, getPath, loading, error};
}

export default usePathData;
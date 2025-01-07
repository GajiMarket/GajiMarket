import { getPathFinder } from '../../api/pathFinder.api';

export interface IPathResponse {
    routes: Array<{
        paths: Array<{
            coordinates: number[][];
        }>;
    }>;
}

const usePathData = () => {
    const getPathCoordinates = async (): Promise<Number[][]> => {
        try {
            const data: IPathResponse = await getPathFinder();

            const coordinates = data.routes[0]?.paths[0]?.coordinates || [];
            return coordinates;
        } catch (error) {
            console.log("Error fetching path data:", error);
            return [];
        }
    };

    return { getPathCoordinates };
}

export default usePathData;
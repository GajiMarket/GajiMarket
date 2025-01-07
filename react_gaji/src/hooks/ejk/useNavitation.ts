import { useState, useEffect } from "react";
import { getPathFinder } from '../../api/pathFinder.api';
import { processCoordinates } from "../../utils/mapUtils";

export const usePathData = () => {
    const [pathData, setPathData] = useState<{ coordinates: [number, number][]} | null>(null);

    useEffect(() => {
        const fetchPathData = async () => {
            try {
                const data = await getPathFinder();

                const coordinates = processCoordinates(data.features);

                if (coordinates.length > 0) {
                    setPathData({ coordinates });
                } else {
                    console.warn('No valid coordinates found in path data');
                }
            } catch (error) {
                console.error('Failed to fetch path data:', error)
            }
        };

        fetchPathData();
    }, []);

    return pathData;
}
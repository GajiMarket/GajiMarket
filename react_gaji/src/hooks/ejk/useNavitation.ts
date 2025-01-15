import { useState, useEffect } from "react";
import { sendPathData } from "../../api/pathFinder.api";
import { processCoordinates } from "../../utils/mapUtils";

export const usePathData = () => {
    const [pathData, setPathData] = useState<{ coordinates: [number, number][]} | null>(null);

    useEffect(() => {
        const fetchPathData = async () => {
            try {
                const data = await sendPathData();
                console.log("API Response FrontEnd Data:", data);

                if (!data || !data.features || !Array.isArray(data.features)) {
                    throw new Error("Invalid response structure: Features missing");
                    return;
                }

                console.log("Features Data:", data.features);

                const coordinates = processCoordinates(data.features);
                
                console.log("coordinates data:", coordinates);

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
};
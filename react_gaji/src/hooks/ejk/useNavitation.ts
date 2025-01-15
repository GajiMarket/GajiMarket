import { useState, useEffect } from "react";
import { sendPathData } from "../../api/pathFinder.api";
import { processCoordinates } from "../../utils/mapUtils";
import { Feature, Geometry, GeoJsonProperties } from "geojson";

export const usePathData = () => {
    const [pathData, setPathData] = useState<IPathResponse | null>(null);

    useEffect(() => {
        const fetchPathData = async () => {
            try {
                const data = await sendPathData();
                // console.log("API Response FrontEnd Data:", data);
                console.log("Features Data:", data.features);
                setPathData(data);

                // const coordinates = processCoordinates(data.features);

                // console.log("coordinates data:", coordinates);

                // if (coordinates.length > 0) {
                    // setPathData({ coordinates });
                // } else {
                    // console.warn('No valid coordinates found in path data');
                // }
            } catch (error) {
                console.error('Failed to fetch path data:', error)
            }
        };

        fetchPathData();
    }, []);

    return pathData;
};
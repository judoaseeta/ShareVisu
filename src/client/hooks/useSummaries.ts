import { useState, useEffect,useCallback } from 'react';
import { getAllPlots, PlotSummary } from '../api';

const UseSummaries = () => {
    const [ summaries,  setSummaries] = useState<PlotSummary[] | null>(null);

    const getSummaries = useCallback(async() => {
        const result = await getAllPlots();
        if(result) {
            setSummaries(result);
        }
    },[

    ]);
    useEffect(() => {
        getSummaries();
    },[

    ]);
    return summaries;
}

export default UseSummaries;

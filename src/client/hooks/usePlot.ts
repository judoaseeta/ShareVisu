import { useState, useEffect,useCallback } from 'react';
import { getPlotBySK, Plot  } from '../api';

const UsePlot = (sk: string) => {
    const [ plot,  setPlot] = useState<Plot | undefined>(undefined);

    const getPlot = useCallback(async() => {
        const result = await getPlotBySK(sk);
        if(result) {
            setPlot(result);
        }
    },[
        sk
    ]);
    useEffect(() => {
        getPlot();
    },[

    ]);
    return plot;
}

export default UsePlot;

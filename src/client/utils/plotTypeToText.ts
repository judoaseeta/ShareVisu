import { PlotType } from '../types';

const PlotTypeToText = (plotType: PlotType) => {
    if(plotType === 'scatter') {
        return '스캐터플롯'
    } else if(plotType === 'line') {
        return '라인 차트'
    } else {
        return '닷 플랏'
    }
}

export default PlotTypeToText;
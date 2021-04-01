import React from 'react';
import { 
    withRouter, 
    RouteComponentProps,
    useHistory
} from 'react-router-dom';
//components 
import HelmetComponent from '../../component/helmet';
import PlotView from '../../component/viewPlot/plotView';
// hooks
import UsePlot from '../../hooks/usePlot';
//
import plotTypeToText from '../../utils/plotTypeToText';
type PlotProps = {} &RouteComponentProps<{sk: string}>;
const Plot: React.FC<PlotProps> = ({
    match: {
        params: {
            sk
        }
    }
}) => {
    const history = useHistory();
    const onBack: React.MouseEventHandler = React.useCallback(() => {
        history.goBack();
    },[
        history
    ]);
    const plot = UsePlot(sk);
    return <div>
        <HelmetComponent 
            title={plot ? plot.title : 'Loading Plot..'}
            description={plot ? `${plot.title} - ${plotTypeToText(plot.plotType)} - (${plot.xLabel} - ${plot.xKey}) - (${plot.yLabel} - ${plot.yKey})`
            : 'Plot'
        }
        />
        {
            plot &&
            <PlotView 
                onBack={onBack}
                plot={plot}
            />
        }
        {
            !plot &&
            <p>로딩중입니다</p>
        }
    </div>
};

export default withRouter(Plot);

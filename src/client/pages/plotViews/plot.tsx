import React from 'react';
import { 
    withRouter, 
    RouteComponentProps,
    useHistory
} from 'react-router-dom';
import PlotView from '../../component/viewPlot/plotView';
import UsePlot from '../../hooks/usePlot';

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

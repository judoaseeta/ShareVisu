import React from 'react';

import SummariesComponent from '../../component/viewPlot/summaries';

import UseSummaries from '../../hooks/useSummaries';

const Summaries: React.FC = () => {
    const summaries = UseSummaries();
    return <div>
        {
            summaries &&
            <SummariesComponent 
                plots={summaries}
            />
        }
        {
            !summaries &&
            <p>로딩중...</p>
        }
    </div>
}

export default Summaries;
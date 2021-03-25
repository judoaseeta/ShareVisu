import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Story, Meta } from '@storybook/react/types-6-0';

import PlotView, { PlotViewProps } from '../plotView';
import { mockScatterPlot } from '../mocks';

export default {
    title: '플랏 유저 뷰',
    decorators: [
        (Story) =><StaticRouter>{Story()}</StaticRouter> 
    ],
    argTypes: {
        onBack: {
            action: 'onBack'
        }
    }
} as Meta;

const Template:Story<PlotViewProps> = (args) => <PlotView {...args} />;

export const 스캐터플랏_유저뷰 = Template.bind({});

스캐터플랏_유저뷰.args = {
    plot: mockScatterPlot
}


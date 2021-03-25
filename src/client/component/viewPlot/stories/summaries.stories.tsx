import React from 'react';
import { StaticRouter } from 'react-router-dom';
import Summaries, { PlotSummariesProps } from '../summaries';
import { Story, Meta } from '@storybook/react/types-6-0';
import { summaries } from '../mocks';
export default {
    title: '플랏 보조 컴퍼넌트 / 플랏 써머리',
    decorators: [
        (Story) =><StaticRouter>{Story()}</StaticRouter> 
    ],
    args: {
        plots: summaries,
    }
} as Meta;

const Template:Story<PlotSummariesProps> = (args) => <Summaries {...args} />;

export const 플랏서머리즈 = Template.bind({});
import { Story, Meta } from '@storybook/react/types-6-0';
import Scatter, { ScatterProps } from '../scatter';
import {
    mockScatterData,
    scatterXscale,
    scatterYScale,
} from '../mocks';
import { mockDimensions} from '../../mocks';
export default {
    title: '플랏 / 스캐터플랏',
    args: {
        data: mockScatterData,
        xScale: scatterXscale,
        yScale: scatterYScale,
        dimensions: mockDimensions
    },
    argTypes: {
        onMouseDown: {
            action: 'mousedown'
        },
        onMouseMove: {
            action: 'mousemove'
        },
        onMouseUp: {
            action: 'mouseUp'
        },
    }
} as Meta;

const ScatterTemplate:Story<ScatterProps> = (args) => <Scatter {...args} />;

export const 스캐터플랏_기본 = ScatterTemplate.bind({});

스캐터플랏_기본.args = {
    xKey: 'x',
    yKey: 'y',
    xLabel:'X축 데이터 - x',
    yLabel: 'Y축 데이터 - y'
}

export const 스캐터플랏_샘플_선택중 = ScatterTemplate.bind({});
스캐터플랏_샘플_선택중.args = {
    xKey: 'x',
    yKey: 'y',
    xLabel:'X축 데이터 - x',
    yLabel: 'Y축 데이터 - y',
    selectingRange : {
        x1: 200,
        x2: 300,
        y1: 50,
        y2: 200
    }
}
export const 스캐터플랏_샘플_선택시 = ScatterTemplate.bind({});

스캐터플랏_샘플_선택시.args = {
    xKey: 'x',
    yKey: 'y',
    xLabel:'X축 데이터 - x',
    yLabel: 'Y축 데이터 - y',
    selectedRange : {
        x1: 200,
        x2: 300,
        y1: 50,
        y2: 200
    }
}
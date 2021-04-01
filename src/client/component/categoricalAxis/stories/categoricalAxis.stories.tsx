import { Story, Meta } from '@storybook/react/types-6-0';

import CategoricalXAxis from '../xAxis';
import XLabel from '../../label/xLabel';
import { mockDimensions } from '../../mocks';
import { CategoricalAxisProps } from '../types';
import { mockXScale } from '../mocks';
export default {
    title: '플랏 보조 컴퍼넌트 / Categorical 타입의 축',
    args: {
        dimensions: mockDimensions
    },
    decorators: [
        (Story) => <svg
            width={mockDimensions.width}
            height={mockDimensions.height}
        >
            <rect 
                x={mockDimensions.marginLeft}
                width={mockDimensions.boundedWidth}
                y={mockDimensions.marginTop}
                height={mockDimensions.boundedHeight}
                fill="blue"
            />
            <Story />
        </svg> 
    ]
} as Meta;

const XAxisTemplate:Story<CategoricalAxisProps> = (args) => 
<g>
    <CategoricalXAxis 
        {...args}
    />
    <XLabel
        dimensions={args.dimensions}
        value="MOCK X-LABEL"
    /> 
</g>;

export const X축_X축_라벨과_함께 = XAxisTemplate.bind({});

X축_X축_라벨과_함께.args = {
    scale:mockXScale
}
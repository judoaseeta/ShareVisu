import { Story, Meta } from '@storybook/react/types-6-0';

import NumericXAxis  from '../numericXAxis';
import NumericYAxis from '../numericYAxis';
import XLabel from '../../label/xLabel';
import YLabel from '../../label/yLabel';
import { NumericAxisProps } from '../types';
import { mockDimensions } from '../../mocks';
import { mockXscale, mockYLinearScale } from '../mock';
export default {
    title: '플랏 보조 컴퍼넌트 / Numeric 타입의 축',
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

const XAxisTemplate: Story<NumericAxisProps> = (args) =>
<g>
    <NumericXAxis {...args} />
    <XLabel
        dimensions={args.dimensions}
        value="MOCK X-LABEL"
    /> 
</g>
const YAxisTemplate: Story<NumericAxisProps> = (args) =>
<g>
    <NumericYAxis {...args} />
    <YLabel 
        dimensions={args.dimensions}
        value="MOCK Y-LABEL"
    />
</g>

export const X축_X축_라벨과_함께 = XAxisTemplate.bind({});

X축_X축_라벨과_함께.args = {
    scale:mockXscale
}

export const Y축_Y축_라벨과_함께 = YAxisTemplate.bind({});

Y축_Y축_라벨과_함께.args = {
    scale:mockYLinearScale
}

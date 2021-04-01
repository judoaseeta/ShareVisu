import { Story, Meta } from '@storybook/react/types-6-0';
import { scaleOrdinal } from 'd3-scale';
import { schemePaired } from 'd3-scale-chromatic'; 
import LinePlot, { LinePlotProps } from '../line';
import {
    mockLine,
    mockLineXscale,
    mockLineYscale,
    getNestedData
} from '../mocks';
import { mockDimensions2 } from '../../mocks';
export default {
    title: '플랏 / 라인플랏',
    argTypes: {
        onMouseEnter: {
            action: 'mouse-enter'
        },
        onClick: {
            action: 'mouse-click'
        }
    }
} as Meta;

const Template:Story<LinePlotProps> = (args) => <LinePlot {...args} />; 
const nestedData =  getNestedData();
const mockZScale = scaleOrdinal<string,string,never>()
                    .domain(Object.keys(nestedData))
                    .range(schemePaired);
export const 라인플랏_이름_연도별_빈도수_선택된_케이스없음 = Template.bind({});
라인플랏_이름_연도별_빈도수_선택된_케이스없음.args = {
    data:nestedData,
    dimensions: mockDimensions2,
    line: mockLine,
    xScale: mockLineXscale,
    yScale: mockLineYscale,
    xKey: 'year',
    xLabel: '연도',
    yKey: 'n',
    yLabel: '빈도',
    zKey: 'name',
    zLabel: '이름',
    zScale: mockZScale,
    selectedIndices: [],
    title: '연도별 이름의 빈도수'
}
export const 라인플랏_이름_연도별_빈도수_선택된_케이스있는_경우= Template.bind({});
라인플랏_이름_연도별_빈도수_선택된_케이스있는_경우.args = {
    ...라인플랏_이름_연도별_빈도수_선택된_케이스없음.args,
    selectedIndices: [3,4]
}
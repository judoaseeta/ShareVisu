import { Story, Meta } from '@storybook/react/types-6-0';

import LabelSelector, { LabelSelectorProps  } from '..';


export default {
    title: '플랏 보조 컴퍼넌트 / 레이블 셀렉터', 
    args : {
        headers: ['1번키','2번키','3번키','4번키','5번키','6번키'],
        xKey:'1번키',
        yKey: '3번키',
        plotType: 'scatter'
    },
    argTypes: {
        onXKeySelect: {
            action: 'xKey'
        },
        onYKeySelect: {
            action: 'yKey'
        }
    }
} as Meta;

const Template:Story<LabelSelectorProps> = (args) => <LabelSelector {...args} />;

export const 레이블셀렉터 = Template.bind({});
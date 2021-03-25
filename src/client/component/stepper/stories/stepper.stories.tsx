import { Story, Meta } from '@storybook/react/types-6-0';

import Stepper, { StepperProps } from '../';

export default {
    title: '플랏 보조 컴퍼넌트 / 플랏 생성 스텝퍼',
    argTypes: {
        selectStep: {
            action: '스텝'
        }
    }
} as Meta;

const Template: Story<StepperProps> = (args) => <Stepper {...args} />;

export const 스텝퍼 = Template.bind({});
스텝퍼.args = {
    step: 0
}
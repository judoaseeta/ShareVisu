import { Story, Meta } from '@storybook/react/types-6-0';

import Loading, { LoadingProps } from '../';

export default {
    title: '플랏 보조 컴퍼넌트 / 로딩 화면',
}

const Template: Story<LoadingProps> = (args) => <Loading {...args} />;

export const 로딩화면_OFF = Template.bind({});

로딩화면_OFF.args = {
    isLoading: false,
    message: '가상 로딩화면입니다',
}
export const 로딩화면_ON = Template.bind({});

로딩화면_ON.args = {
    isLoading: true,
    message: '가상 로딩화면입니다',
}
export const 로딩화면_전체화면_ON = Template.bind({});

로딩화면_전체화면_ON.args = {
    isLoading: true,
    isFull: true,
    message: '가상 전체화면 로딩입니다',
}
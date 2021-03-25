import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Story, Meta } from '@storybook/react/types-6-0';
import Nav from '../';

export default {
    title: '네비게이션',
    decorators: [
        (Story) =><StaticRouter>{Story()}</StaticRouter> 
    ],
} as Meta;

const Template:Story = () => <Nav />;

export const 네비게이션 = Template.bind({});

import React from 'react';

import { Story, Meta  } from '@storybook/react/types-6-0';
import { Button,ButtonProps  } from  '../src/Button';

export default {
  title: 'Button',
  component: Button,
  argTypes :{
    backgroundColor: {
      control: { type: 'color'}
    },
    color: {
      control: { type: 'color'}
    },
    width: {
      control: { type: 'text'}
    },
    height: {
      control: { type: 'text'}
    }
  }
} as Meta;


const Template: Story<ButtonProps> = (args: ButtonProps) => <Button  {...args}>Hi</Button>;

export const WithControl = Template.bind({});

WithControl.args = {
  backgroundColor: '#000000',
  color: '#ffffff',
  width: '4em',
  height: '2em'
}

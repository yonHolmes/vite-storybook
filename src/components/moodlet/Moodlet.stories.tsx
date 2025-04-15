import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';
import { Moodlet } from './Moodlet';

import { AccountIcon } from '../icons/AccountIcon';
import { CloseIcon } from '../icons/CloseIcon';
import { CheckIcon } from '../icons/CheckIcon';

const moodletStoryIconArg = {
  options: [
    'Account',
    'Check',
    'Close',
    'undefined',
  ],
  mapping: {
    Account: <AccountIcon/>,
    Check: <CheckIcon/>,
    Close: <CloseIcon/>,
    undefined: undefined,
  }
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Moodlet',
  component: Moodlet,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['Moodlet'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    label: { control: 'text' },
    leftIcon: moodletStoryIconArg,
    rightIcon: moodletStoryIconArg,
    color: { control: 'color' },
    fill: { control: 'color' },
    onClick: {
      type: 'function',
      description: 'A Callback Function',
    },
    fontSize: {
      options: [
        undefined,
        '8px',
        '10px',
        '12px',
        '14px',
        '16px',
        '20px',
        '24px',
        '32px',
        '38px',
        '42px',
      ],
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    // onClick: fn()
  },
} satisfies Meta<typeof Moodlet>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const NonClickable: Story = {
  args: {
    label: 'LOR',
    fill: '#824DFF',
    leftIcon: 'Account',
    rightIcon: 'Check',
  },
};

export const Clickable: Story = {
  args: {
    label: 'LOR',
    fill: '#824DFF',
    color: 'white',
    leftIcon: 'Check',
    onClick: () => console.log('Clicked Moodlet'),
  }
}

export const Contrasted: Story = {
  args: {
    label: 'LOR',
    fill: '#FFD116',
    color: 'black',
    leftIcon: 'Close',
    onClick: () => console.log('Clicked Moodlet'),
  }
}

export const IconOnly: Story = {
  args: {
    fill: '#FFD116',
    color: 'black',
    leftIcon: 'Close',
    onClick: () => console.log('Clicked Moodlet'),
  }
}
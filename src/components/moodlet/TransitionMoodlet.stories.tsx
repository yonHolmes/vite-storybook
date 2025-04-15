import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';
import { Moodlet } from './Moodlet';

import { TransitionMoodlet } from './TransitionMoodlet';
import { ComponentProps } from 'react';
import { AccountIcon } from '../icons/AccountIcon';
import { CheckIcon } from '../icons/CheckIcon';
import { CloseIcon } from '../icons/CloseIcon';

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
  title: 'TransitionMoodlet',
  component: TransitionMoodlet,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['TransitionMoodlet', 'Moodlet'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
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
    leftIcon: moodletStoryIconArg,
    rightIcon: moodletStoryIconArg,
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    // onClick: fn()
  },
} satisfies Meta<typeof Moodlet>;

export default meta;
type Story = StoryObj<typeof meta>;

const transitionStates = {
  required: {
    fill: '#998DBF',
    leftClickKey: 'current',
    rightClickKey: 'notRequired',
  },
  current: {
    fill: '#D22D5C',
    leftClickKey: 'completed',
  },
  completed: {
    fill: '#319B31',
    leftClickKey: 'current',
    rightClickKey: 'required',
  },

  // Noticed that 'Not Required' is styled like 'Read Only'
  // but needs to be clickable, so styled to look as though it is
  notRequired: {
    fill: '#E2DEED',
    color: '#998DBF',
    border: '1px solid #998DBF',
    rightClickKey: 'required',
  },
} satisfies ComponentProps<typeof TransitionMoodlet>["states"];

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Labeled: Story = {
  args: {
    initialState: 'required',
    label: 'FUELLING',
    fontSize: '20px',
    states: transitionStates,
  },
};

export const Charactered: Story = {
  args: {
    initialState: 'required',
    label: 'F',
    fontSize: '20px',
    states: transitionStates,
  },
};
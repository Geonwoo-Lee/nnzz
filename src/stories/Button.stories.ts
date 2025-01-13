import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from '@/src/app/component/client/common/button/Button';
import { ButtonProps } from '../app/types/common/button';

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'ml', 'lg'],
      description: '버튼 크기'
    },
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'outlined', 'transparent'],
      description: '버튼 타입'
    },
    fullRound: {
      control: 'boolean',
      description: '완전한 원형 모서리 적용'
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화'
    },
    color: {
      control: 'text',
      description: '커스텀 텍스트 색상'
    }
  },
  args: {
    onClick: fn(),
    size: 'md',
    type: 'primary'
  }
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'primary',
    size: 'md',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    size: 'md',
    children: 'Secondary Button',
  },
};

export const Muted: Story = {
  args: {
    type: 'muted',
    size: 'md',
    children: 'Muted Button',
  },
};

export const Outlined: Story = {
  args: {
    type: 'outlined',
    size: 'md',
    children: 'Outlined Button',
  },
};

export const Transparent: Story = {
  args: {
    type: 'transparent',
    size: 'md',
    children: 'Transparent Button',
  },
};

export const Small: Story = {
  args: {
    type: 'primary',
    size: 'sm',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    type: 'primary',
    size: 'md',
    children: 'Medium Button',
  },
};

export const MediumLarge: Story = {
  args: {
    type: 'primary',
    size: 'ml',
    children: 'Medium Large Button',
  },
};

export const Large: Story = {
  args: {
    type: 'primary',
    size: 'lg',
    children: 'Large Button',
  },
};

export const FullRound: Story = {
  args: {
    type: 'primary',
    size: 'md',
    children: 'Full Round Button',
    fullRound: true,
  },
};

export const Disabled: Story = {
  args: {
    type: 'primary',
    size: 'md',
    children: 'Disabled Button',
    disabled: true,
  },
};

export const CustomColor: Story = {
  args: {
    type: 'primary',
    size: 'md',
    children: 'Custom Color Button',
    color: 'text-blue-500',
  },
};
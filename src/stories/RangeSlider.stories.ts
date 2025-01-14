import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {RangeSliderProps} from "@/src/app/types/common/rangeSlider";
import RangeSlider from "@/src/app/component/client/common/rangeSlider/RangeSlider";
import {ButtonProps} from "@/src/app/types/common/button";

const meta: Meta<RangeSliderProps> = {
    title: 'Components/RangeSlider',
    component: RangeSlider,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        steps: {
            control: 'select',
            description: '스텝'
        },
        defaultValue: {
            control: 'number',
            description: '기본값'
        },
        max: {
            control: 'number',
            description: '최대값'
        },
        changeDistance: {
            action: 'changed',
            description: '거리 변경 함수'
        }
    },
    args: {
        changeDistance: fn(),
        steps: [10, 20, 30, 40, 50],
        defaultValue: 30,
        max: 50,
    }
} satisfies Meta<RangeSliderProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        steps: [10, 20, 30, 40, 50],
        defaultValue: 30,
        max: 50,
    },
};
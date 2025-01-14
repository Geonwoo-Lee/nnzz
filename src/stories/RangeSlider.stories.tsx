import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {RangeSliderProps} from "@/src/app/types/common/rangeSlider";
import RangeSlider from "@/src/app/component/client/common/rangeSlider/RangeSlider";

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
            options: [[10, 20, 30, 40, 50]],
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
        defaultValue: 30,
        max: 50,
    }
} satisfies Meta<RangeSliderProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: [
        (Story) => (
            <div className='flex flex-col gap-6 w-full'>
                <Story />
                <button className='bg-blue-500 text-white px-4 py-2 rounded'>
                    적용하기
                </button>
            </div>
        ),
    ],
    args: {
        steps: [250, 500, 750],
        defaultValue: 250,
        max: 750,
        changeDistance: fn()
    },
};
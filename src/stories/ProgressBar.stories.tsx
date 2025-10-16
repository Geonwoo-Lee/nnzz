import {ProgressBarProps} from "@/src/types/common/progressBar";
import type {Meta, StoryObj} from "@storybook/react";
import ProgressBar from "@/src/component/client/common/progressBar/ProgressBar";



const meta: Meta<ProgressBarProps> = {
    title: 'Components/ProgressBar',
    component: ProgressBar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        currentStep: {
            control: 'number',
            description: '최대 값'
        },
        totalStep: {
            control: 'number',
            description: '최대 값'
        },
        leftCount: {
            control: 'boolean',
            description: '최솟값 텍스트 보여주기'
        },
        minRequired: {
            control: 'number',
            description: '최대 값'
        },
        style: {
            control: 'text',
            description: 'CSS'
        },
        bg: {
            control: 'text',
            description: 'CSS'
        },
        borderColor: {
            control: 'text',
            description: 'CSS'
        },
        height: {
            control: 'text',
            description: 'CSS'
        },
        width: {
            control: 'text',
            description: 'CSS'
        },
        beforeMinText: {
            control: 'text',
            description: '최소값 완료 전 텍스트'
        },
        afterMinText: {
            control: 'text',
            description: '최소값 완료 후 텍스트'
        }
    },
    args: {
        currentStep: 1,
        totalStep: 5,
        leftCount: true,
        minRequired: 3,
        beforeMinText: "최소 개수를 채워주세요! 💪",
        afterMinText: "앞으로 {count}개 남았어요! 💪",
        width: 'w-full',
        height: 'h-3'
    }
}satisfies Meta<ProgressBarProps>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        currentStep: 1,
        totalStep: 5,
        leftCount: true,
        minRequired: 3,
        beforeMinText: "최소 개수를 채워주세요! 💪",
        afterMinText: "앞으로 {count}개 남았어요! 💪",
    },
};
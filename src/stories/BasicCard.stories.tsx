import type {Meta, StoryObj} from "@storybook/react";
import {BasicCardProps} from "@/src/types/page/swape/card";
import BasicCard from "@/src/component/client/common/card/BasicCard";


const meta: Meta<BasicCardProps> = {
    title: 'Components/BasicCard',
    component: BasicCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        data: {
            control: 'object',
            description: '데이터'
        },
        className: {
            control: 'text',
            description: 'CSS'
        }
    },

    args: {
        data: {
            imageUrl: "/images/food/food-swipe/Donkats.png",
            bgType: "Red",
            category: '일식',
            distance: 223,
            represent: '돈가스, 모밀, 초밥',
            categoryId: '33',
        },
    }
}satisfies Meta<BasicCardProps>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: [
        (Story) => (
            <div className='overflow-hidden min-w-[400px] bg-common-white relative shadow-card flex flex-col cursor-grab touch-none border border-line-1 rounded-[12px]'>
            <Story />
                </div>
        ),
    ],
    args: {
        data: {
            imageUrl: "/images/food/food-swipe/Donkats.png",
            bgType: "Red",
            category: '일식',
            distance: 223,
            represent: '돈가스, 모밀, 초밥',
            categoryId: '33'
        }
    }
}


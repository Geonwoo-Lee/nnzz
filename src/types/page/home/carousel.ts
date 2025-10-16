import {ComponentType} from "react";


export interface  CarouselProps {
    children: React.ReactNode;
    speed: number;
    direction?: CarouselDirection;
}

export enum CarouselDirection {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right'
}


export interface LandingComponentType {
    HomeCarousel: ComponentType;
    ConveyorCarousel: ComponentType<CarouselProps>;
}

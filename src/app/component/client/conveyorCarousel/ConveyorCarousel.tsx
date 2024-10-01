import Marquee from "react-fast-marquee";
import {CarouselDirection} from "@/src/app/types/component/carousel";

const ConveyorCarousel = ({children, speed, direction}: {children: React.ReactNode, speed: number, direction?: CarouselDirection}) => {
    return (
        <Marquee speed={speed} direction={direction ? direction : CarouselDirection.LEFT}>
            {children}
        </Marquee>
    )
}


export default ConveyorCarousel
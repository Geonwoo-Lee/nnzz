import Marquee from "react-fast-marquee";
import {CarouselDirection, CarouselProps} from "@/src/types/page/home/carousel";

const ConveyorCarousel = ({children, speed, direction}: CarouselProps) => {
    return (
        <Marquee speed={speed} direction={direction ? direction : CarouselDirection.LEFT}>
            {children}
        </Marquee>
    )
}


export default ConveyorCarousel
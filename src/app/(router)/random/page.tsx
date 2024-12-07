'use client'
import Header from "@/src/app/component/server/common/header/Header";
import {HeaderTypes} from "@/src/app/types/common/header";
import RandomCard from "@/src/app/component/client/common/card/RandomCard";
import Button from "@/src/app/component/client/common/button/Button";
import { useRef} from "react";

const RandomPage = () => {
    const imageLocation = "/images/food/food-swipe"
    const cardRef = useRef<HTMLDivElement>(null);
    const handleKakaoShare = async () => {
        if (!cardRef.current) {
            console.log('카드 요소를 찾을 수 없습니다');
            return;
        }

        try {
            const htmlToImage = await import('html-to-image');

            // 이미지 생성
            const dataUrl = await htmlToImage.toPng(cardRef.current, {
                quality: 1.0,
                pixelRatio: 2
            });

            // 이미지 다운로드
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `random-menu-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (err) {
            alert('이미지 저장에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <>
            <section className='h-random-height overflow-y-hidden bg-bg-1 flex flex-col'>
                <div className="pl-4 pr-4">
                    <Header.HeaderLayout
                        headerBg='bg-bg-1'
                        close={true}
                        type={HeaderTypes.close}
                        title={'랜덤 뽑기'}
                    />
                </div>
                <div className='flex-1 flex justify-center items-center'>
                    <div className='w-[80%] max-w-[400px]' ref={cardRef}>
                        <RandomCard data={
                            {
                                id: 12,
                                imageUrl: `${imageLocation}/Sushi.png`,
                                category: "일식",
                                name: "초밥",
                                representativeMenu: "초밥",
                            }
                        }/>
                    </div>
                </div>
                <div className='px-4 pb-12 pt-4 w-full bg-bg-1 fixed bottom-0 flex flex-col gap-4'>
                    <Button type='primary' size='lg' style='w-full' onClick={handleKakaoShare}>
                        이미지로 공유하기
                    </Button>
                    <Button type='transparent' size='lg' style='w-full' onClick={() => {
                    }}>
                        식당리스트 확인하기
                    </Button>
                </div>
            </section>
        </>
    )
}

export default RandomPage
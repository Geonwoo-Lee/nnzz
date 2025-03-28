'use client'
import Header from "@/src/app/component/server/common/header/Header";
import {HeaderTypes} from "@/src/app/types/common/header";
import RandomCard from "@/src/app/component/client/common/card/RandomCard";
import Button from "@/src/app/component/client/common/button/Button";
import {useEffect, useRef, useState} from "react";
import FindApi from "@/src/app/api/client/find/find";
import {getUserLocation} from "@/src/app/func/common/geo.utils";
import {CardImageModal, RandomStore} from "@/src/app/types/models/find";
import foodData from "@/src/app/dummy/dummy";
import Loading from "@/src/app/component/client/common/loading/Loading";
import {useFunnel} from "@/src/app/hooks/useFunnel";
import RestaurantResult from "@/src/app/component/client/common/restaurantResult/RestaurantResult";
import html2canvas from "html2canvas";

const RandomPage = ({params}: { params: { type: string, day: string } }) => {
    const [randomData, setRandomData] = useState<RandomStore>({} as RandomStore);
    const [Funnel, setStep] = useFunnel(['random', 'list'], "random");
    const [isLoading, setIsLoading] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [isCapturing] = useState(false);
    const handleCardImageShare = () => {
        try {
            if (!randomData || !randomData.categoryId) {
                console.error('데이터가 없습니다');
                alert('데이터를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
                return;
            }

            // 카드에 필요한 데이터 수집
            const categoryId = randomData.categoryId;
            const foodItem = foodData.find(item => item.categoryId === categoryId);

            if (!foodItem || !foodItem.imageUrl) {
                console.error('이미지를 찾을 수 없습니다');
                alert('이미지를 찾을 수 없습니다.');
                return;
            }

            // 수동으로 이미지를 그리기 위한 데이터 준비
            const cardData = {
                imageUrl: foodItem.imageUrl,
                category: randomData.category || '카테고리',
                represent: randomData.represent || '대표 메뉴',
                distance: randomData.distance || '',
                categoryId: randomData.categoryId
            };

            // 이미지가 미리 로드되었는지 확인
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                // 이미지가 로드된 후 수동으로 카드 생성
                createCardImage(cardData);
            };
            img.onerror = () => {
                console.error('이미지 로드 실패:', foodItem.imageUrl);
                alert('이미지를 불러올 수 없습니다. 네트워크 연결을 확인하세요.');
            };
            img.src = foodItem.imageUrl;
        } catch (err: any) {
            console.log(`오류가 발생했습니다: ${err.message}`);
        }
    };

// 카드 이미지를 직접 생성
    const createCardImage = (cardData: CardImageModal) => {
        // 기존에 보이는 UI 컴포넌트와 동일한 스타일의 임시 DOM 요소 생성
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        tempDiv.style.width = '400px';
        tempDiv.style.height = '500px'; // 4:5 비율
        tempDiv.style.backgroundColor = '#fff';
        tempDiv.style.borderRadius = '12px';
        tempDiv.style.boxShadow = '0 8px 28px 0 rgba(0,0,0,0.2)';
        tempDiv.style.border = '1px solid #f1f5f9';
        tempDiv.style.padding = '32px';
        tempDiv.style.display = 'flex';
        tempDiv.style.flexDirection = 'column';
        tempDiv.style.gap = '16px';

        // 상단 텍스트
        const titleDiv = document.createElement('div');
        titleDiv.style.fontWeight = '500';
        titleDiv.style.fontSize = '20px';
        titleDiv.style.color = '#0f172a';
        titleDiv.innerHTML = `오늘 <br/>${cardData.category} 어때요?`;
        tempDiv.appendChild(titleDiv);

        // 이미지 컨테이너
        const imgContainer = document.createElement('div');
        imgContainer.style.flex = '1';
        imgContainer.style.position = 'relative';
        imgContainer.style.borderLeft = '1px solid #e2e8f0';

        // 실제 이미지
        const foodImg = document.createElement('img');
        foodImg.src = cardData.imageUrl;
        foodImg.style.width = '100%';
        foodImg.style.height = '100%';
        foodImg.style.objectFit = 'contain';
        foodImg.crossOrigin = 'anonymous';
        imgContainer.appendChild(foodImg);
        tempDiv.appendChild(imgContainer);

        // 하단 정보
        const infoDiv = document.createElement('div');
        infoDiv.style.display = 'flex';
        infoDiv.style.flexDirection = 'column';
        infoDiv.style.gap = '8px';

        // 카테고리 제목
        const categoryTitle = document.createElement('h2');
        categoryTitle.style.fontSize = '20px';
        categoryTitle.style.fontWeight = '500';
        categoryTitle.style.color = '#0f172a';
        categoryTitle.textContent = cardData.category;
        infoDiv.appendChild(categoryTitle);

        // 위치 정보
        const locationDiv = document.createElement('div');
        locationDiv.style.display = 'flex';
        locationDiv.style.alignItems = 'center';

        // 위치 아이콘 (간단한 원으로 대체)
        const locationIcon = document.createElement('div');
        locationIcon.style.width = '16px';
        locationIcon.style.height = '16px';
        locationIcon.style.borderRadius = '50%';
        locationIcon.style.backgroundColor = '#64748b';
        locationIcon.style.marginRight = '8px';
        locationDiv.appendChild(locationIcon);

        // 거리 텍스트
        const distanceText = document.createElement('div');
        distanceText.style.fontSize = '14px';
        distanceText.style.color = '#0f172a';
        distanceText.textContent = `가까운 식당 ${cardData.distance}m`;
        locationDiv.appendChild(distanceText);
        infoDiv.appendChild(locationDiv);

        // 대표 메뉴
        const menuText = document.createElement('div');
        menuText.style.fontSize = '14px';
        menuText.style.color = '#0f172a';
        menuText.textContent = cardData.represent;
        infoDiv.appendChild(menuText);

        tempDiv.appendChild(infoDiv);
        document.body.appendChild(tempDiv);

        // 요소가 완전히 렌더링될 시간을 주기 위해 지연 후 캡처
        setTimeout(() => {
            // html2canvas 새로운 옵션으로 시도
            html2canvas(tempDiv, {
                useCORS: true,
                allowTaint: true,
                scale: 2,
                backgroundColor: '#ffffff',
                logging: false,
                ignoreElements: () => {
                    // 캡처에서 제외할 요소 조건
                    return false;
                }
            }).then(canvas => {
                // 임시 요소 제거
                document.body.removeChild(tempDiv);

                // 캔버스를 이미지로 변환
                const cardImageUrl = canvas.toDataURL('image/png', 1.0);
                showCardImageModal(cardImageUrl);
            }).catch(error => {
                document.body.removeChild(tempDiv);
                console.error('캡처 실패:', error);

                // 마지막 방법으로 수동 Canvas API 사용
                manualCanvasRendering(cardData);
            });
        }, 500);
    };

    const manualCanvasRendering = (cardData: CardImageModal) => {
        const foodImage = new Image();
        foodImage.crossOrigin = 'anonymous';

        foodImage.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                alert('이미지 생성에 실패했습니다');
                return;
            }

            // 카드 크기 설정 - 4:5 비율 유지
            const cardWidth = 400;
            const cardHeight = 500; // 4:5 비율

            canvas.width = cardWidth;
            canvas.height = cardHeight;

            // 배경
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, cardWidth, cardHeight);

            // 테두리
            ctx.strokeStyle = '#f1f5f9';
            ctx.lineWidth = 1;
            ctx.strokeRect(0, 0, cardWidth, cardHeight);

            // 패딩
            const padding = 32;

            // 상단 텍스트
            ctx.fillStyle = '#0f172a';
            ctx.font = '500 20px -apple-system, BlinkMacSystemFont, sans-serif';
            ctx.fillText('오늘', padding, padding + 20);
            ctx.fillText(`${cardData.category} 어때요?`, padding, padding + 48);

            // 컨텐츠 영역 계산 (하단 패딩 증가)
            const contentTop = padding + 64;
            // 하단에 더 많은 공간 확보 (기존 80에서 100으로 증가)
            const contentHeight = cardHeight - contentTop - padding - 100;

            // 왼쪽 세로 테두리
            ctx.beginPath();
            ctx.strokeStyle = '#e2e8f0';
            ctx.moveTo(padding, contentTop);
            ctx.lineTo(padding, contentTop + contentHeight);
            ctx.stroke();

            // 이미지 영역 계산
            const imageMaxWidth = cardWidth - (padding * 2) - 12;
            const imageMaxHeight = contentHeight;

            // 원본 이미지 비율 계산
            const imgRatio = foodImage.width / foodImage.height;

            // 이미지 크기 계산 (비율 유지)
            let drawWidth, drawHeight;

            if (imgRatio > 1) { // 가로가 더 긴 이미지
                drawWidth = Math.min(imageMaxWidth, imageMaxHeight * imgRatio);
                drawHeight = drawWidth / imgRatio;
            } else { // 세로가 더 긴 이미지
                drawHeight = Math.min(imageMaxHeight, imageMaxWidth / imgRatio);
                drawWidth = drawHeight * imgRatio;
            }

            const imgX = padding + ((imageMaxWidth - drawWidth) / 2);
            const imgY = contentTop + ((imageMaxHeight - drawHeight) / 2);

            // 이미지 그리기
            ctx.drawImage(foodImage, imgX, imgY, drawWidth, drawHeight);

            const bottomY = contentTop + contentHeight + 12;

            ctx.fillStyle = '#0f172a';
            ctx.font = '500 20px -apple-system, BlinkMacSystemFont, sans-serif';
            ctx.fillText(cardData.category, padding, bottomY + 24);

            ctx.fillStyle = '#64748b';
            ctx.beginPath();
            ctx.arc(padding + 8, bottomY + 52, 6, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#0f172a';
            ctx.font = '400 14px -apple-system, BlinkMacSystemFont, sans-serif';
            ctx.fillText(`가까운 식당 ${cardData.distance}m`, padding + 24, bottomY + 56);

            ctx.fillText(cardData.represent, padding, bottomY + 84);

            const cardImageUrl = canvas.toDataURL('image/png', 1.0);
            showCardImageModal(cardImageUrl);
        };

        foodImage.onerror = () => {
            alert('이미지를 불러올 수 없습니다');
        };

        foodImage.src = cardData.imageUrl;
    };


    const showCardImageModal = (imageUrl: string): void => {
        // 모달 컨테이너
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.75)';
        modal.style.zIndex = '9999';
        modal.style.display = 'flex';
        modal.style.flexDirection = 'column';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.padding = '20px';

        // 이미지 컨테이너 - 카드 비율 유지
        const imgContainer = document.createElement('div');
        imgContainer.style.width = '85%';
        imgContainer.style.maxWidth = '320px';
        imgContainer.style.display = 'flex';
        imgContainer.style.flexDirection = 'column';
        imgContainer.style.alignItems = 'center';

        // 이미지 표시
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = '랜덤 카드';
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.borderRadius = '12px';
        img.style.boxShadow = '0 8px 28px 0 rgba(0,0,0,0.2)';
        imgContainer.appendChild(img);

        modal.appendChild(imgContainer);

        // 안내 텍스트
        const helpText = document.createElement('p');
        helpText.textContent = '이미지를 길게 누르면 저장할 수 있습니다';
        helpText.style.color = 'white';
        helpText.style.margin = '16px 0 0 0';
        helpText.style.fontSize = '14px';
        helpText.style.textAlign = 'center';
        imgContainer.appendChild(helpText);

        // 버튼 컨테이너
        const buttonContainer = document.createElement('div');
        buttonContainer.style.marginTop = '20px';
        buttonContainer.style.width = '100%';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'center';

        // 닫기 버튼
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '닫기';
        closeBtn.style.padding = '12px 24px';
        closeBtn.style.backgroundColor = '#e74c3c';
        closeBtn.style.color = 'white';
        closeBtn.style.border = 'none';
        closeBtn.style.borderRadius = '8px';
        closeBtn.style.fontSize = '16px';
        closeBtn.style.fontWeight = '500';
        closeBtn.style.cursor = 'pointer';

        closeBtn.onclick = () => document.body.removeChild(modal);

        buttonContainer.appendChild(closeBtn);
        imgContainer.appendChild(buttonContainer);

        document.body.appendChild(modal);
    };


    useEffect(() => {
        setIsLoading(true);
        FindApi.RandomStores(params.type, {
            lat: getUserLocation()?.latitude || 0,
            lng: getUserLocation()?.longitude || 0,
            day: params.day
        }).then((res) => {
            setRandomData(res);
            setIsLoading(false);
        })
    }, []);

    return (
        <Funnel>
            <Funnel.Step name='random'>
                <section className='h-random-height overflow-y-hidden bg-bg-1 flex flex-col'>
                    {
                        isLoading ? (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                <Loading/>
                            </div>
                        ) : <>
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
                                            categoryId: randomData.categoryId,
                                            imageUrl: foodData.find((el) => el.categoryId === randomData.categoryId)?.imageUrl || "",
                                            category: randomData.category,
                                            represent: randomData.represent,
                                            distance: randomData.distance
                                        }
                                    }/>
                                </div>
                            </div>
                            <div
                                className='px-4 max-w-[640px] pb-6 h-[180px] pt-4 w-full bg-bg-1 fixed bottom-0 flex flex-col gap-4'>
                                <Button
                                    type='primary'
                                    size='lg'
                                    style='w-full'
                                    onClick={handleCardImageShare}
                                    disabled={isCapturing}
                                >
                                    {isCapturing ? '이미지 저장 중...' : '이미지 저장하기'}
                                </Button>
                                <Button type='outlined' size='lg' style='w-full' onClick={() => {
                                    setStep('list')
                                }}>
                                    식당리스트 확인하기
                                </Button>
                            </div>
                        </>
                    }
                </section>
            </Funnel.Step>
            <Funnel.Step name='list'>
                <RestaurantResult name={getUserLocation()?.name || ''} address={getUserLocation()?.address || ''} day={params.day} type={params.type} lat={ getUserLocation()?.latitude || 0} lng={ getUserLocation()?.longitude || 0} categoryList={[randomData.categoryId]} />
            </Funnel.Step>
        </Funnel>
    )
}

export default RandomPage
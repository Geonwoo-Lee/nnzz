'use client'
import React, { useEffect, useRef, useState, useCallback } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import {FindStore} from "@/src/app/types/models/find";
import ResultCard from "@/src/app/component/client/common/restaurantResult/component/ResultCard";
import Menu from '../../../../../../public/svg/header/Menu.svg'
import {useNaverMapLoaded} from "@/src/app/hooks/useNaverMapLoaded";


interface Props {
    places: FindStore[];
    selectedStore?: FindStore;
    onStoreSelect: (storeId: FindStore) => void;
    isUp?: boolean
    setStep: (step: 'map' | 'list' | 'result') => void
    step: 'map' | 'list' | 'result'
}


const RestaurantMap: React.FC<Props> = ({ places,step, selectedStore, onStoreSelect, isUp, setStep }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const path = usePathname();
    const [mapError, setMapError] = useState<string | null>(null);
    const [map, setMap] = useState<any>(null);
    const markersRef = useRef<{ [key: string]: any }>({});
    const { isLoaded, mapScriptError } = useNaverMapLoaded();

    useEffect(() => {
        if (places.length > 0 && !selectedStore?.storeId && onStoreSelect) {
            onStoreSelect(places[0]);
        }
    }, [places, selectedStore, onStoreSelect]);

    useEffect(() => {
        if (map && places.length > 0) {
            const bounds = new window.naver.maps.LatLngBounds();
            places.forEach(place => {
                bounds.extend(new window.naver.maps.LatLng(place.lat, place.lng));
            });
            map.fitBounds(bounds);
        }
    }, [map, places, step]);

    const initializeMap = useCallback(() => {
        if (!mapRef.current || places.length === 0 || !window.naver) return;

        try {
            if (!map) {
                const options = {
                    center: new window.naver.maps.LatLng(
                        selectedStore?.lat || places[0].lat,
                        selectedStore?.lng || places[0].lng
                    ),
                    zoom: 20,
                    scaleControl: false,
                    logoControl: true,
                    mapDataControl: false,
                    zoomControl: false,
                    mapTypeControl: false,
                    logoControlOptions: {
                        position: window.naver.maps.Position.TOP_LEFT
                    }
                };
                const newMap = new window.naver.maps.Map(mapRef.current, options);
                setMap(newMap);

                // 초기 bounds 설정
                const bounds = new window.naver.maps.LatLngBounds();
                places.forEach(place => {
                    bounds.extend(new window.naver.maps.LatLng(place.lat, place.lng));
                });
                newMap.fitBounds(bounds);
            }

            Object.values(markersRef.current).forEach(marker => marker.setMap(null));
            markersRef.current = {};

            places.forEach(place => {
                const isSelected = selectedStore
                    ? place.storeId === selectedStore.storeId
                    : place.storeId === places[0].storeId;

                const marker = new window.naver.maps.Marker({
                    position: new window.naver.maps.LatLng(place.lat, place.lng),
                    map: map || null,
                    zIndex: isSelected ? 100 : 1,  // 선택된 마커는 더 높은 zIndex
                    icon: isSelected ? {
                        content: '<img src="/assets/mapPinColored.png" alt="Selected Pin" style="width:38px; height:50px; -webkit-user-drag: none; user-select: none;" />',
                        anchor: new window.naver.maps.Point(20, 40),
                    } : {
                        content: '<div class="cs_mapbridge"><div class="map_marker"><img class="marker_thumb_img" src="/assets/mapPinRed.png" alt="기본 마커" style="-webkit-user-drag: none; user-select: none;"></div></div>',
                        anchor: new window.naver.maps.Point(12, 38),
                    },
                });

                window.naver.maps.Event.addListener(marker, 'click', () => {
                    if (onStoreSelect) {
                        onStoreSelect(place);
                        map.setZoom(17);
                        map.setCenter(new window.naver.maps.LatLng(place.lat, place.lng));
                    }
                });

                markersRef.current[place.storeId] = marker;
            });
            if (selectedStore) {
                map?.setZoom(17);
                map?.setCenter(new window.naver.maps.LatLng(selectedStore.lat, selectedStore.lng));
            }
        } catch (error) {
            setMapError(`Failed to initialize map: ${(error as Error).message}`);
        }
    }, [map, places, selectedStore, onStoreSelect]);

// 선택된 가게가 변경될 때 마커 스타일 업데이트
    useEffect(() => {
        if (!map || !window.naver) return;

        Object.entries(markersRef.current).forEach(([storeId, marker]) => {
            const isSelected = storeId === selectedStore?.storeId;
            marker.setZIndex(isSelected ? 100 : 1);
            marker.setIcon(isSelected ? {
                content: '<img src="/assets/mapPinColored.png" alt="Selected Pin" style="width:38px; height:50px;" />',
                anchor: new window.naver.maps.Point(20, 40),
            } : {
                content: '<div class="cs_mapbridge"><div class="map_marker"><img style="width:38px; height:50px;"  src="/assets/mapPinRed.png" alt="기본 마커"></div></div>',
                anchor: new window.naver.maps.Point(12, 38),
            });
        });

        if (selectedStore) {
            const selectedPlace = places.find(place => place.storeId === selectedStore?.storeId);
            if (selectedPlace) {
                map.setCenter(new window.naver.maps.LatLng(selectedPlace.lat, selectedPlace.lng));
            }
        }
    }, [selectedStore, places, map]);

    useEffect(() => {
        if (isLoaded && window.naver && places.length > 0) {
            initializeMap();
        }
    }, [isLoaded, places, path, initializeMap]);

    const handleScriptLoad = () => {
        initializeMap();
    };

    if (mapError || mapScriptError) {
        return <div>Error: {mapError}</div>;
    }


    return (
        <div className='relative'>
            {!isLoaded && (
                <Script
                    src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
                    onLoad={handleScriptLoad}
                    strategy="afterInteractive"
                    onError={() => setMapError('Failed to load Naver Maps script')}
                />
            )}
            <header
                className={`w-full max-w-[640px] flex items-center justify-between relative h-header-height bg-common-white px-4`}>
                <div className=" flex-shrink-0 ">
                </div>
                <div
                    className="absolute inset-x-0 text-title2 font-bold text-text-2 flex justify-center max-w-[180px] mx-auto whitespace-nowrap">
                    식당보기
                </div>
                <div className="flex-shrink-0 text-caption1 text-text-2 font-medium">
                    <Menu onClick={() => {setStep('list')}}/>
                </div>
            </header>
            {
                selectedStore && <div className={`absolute w-full px-4 inline-flex z-10 ${isUp ? 'bottom-16' : 'bottom-24'}`}>
                    <ResultCard setSelectedStore={onStoreSelect} setStep={setStep} isMap={true} data={selectedStore}/>
                </div>
            }

            <div className={`w-full ${isUp ? 'h-restaurant-result-up-height' : 'h-restaurant-result-height'}`}>
                <div ref={mapRef} style={{width: "100%", height: "100%"}}/>
            </div>
        </div>
    );
};

export default RestaurantMap;
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
    selectedStore: FindStore | null;
    onStoreSelect: (storeId: FindStore | null) => void;
    isUp?: boolean
    setStep: (step: 'map' | 'list' | 'result') => void
    step: 'map' | 'list' | 'result'
}

const RestaurantMap: React.FC<Props> = ({ places, step, selectedStore, onStoreSelect, isUp, setStep }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const path = usePathname();
    const [mapError, setMapError] = useState<string | null>(null);
    const [map, setMap] = useState<any>(null);
    const markersRef = useRef<{ [key: string]: any }>({});
    const { isLoaded, mapScriptError } = useNaverMapLoaded();

    const isMapInitializedRef = useRef<boolean>(false);
    const isBoundsSetRef = useRef<boolean>(false);

    useEffect(() => {
        if (places.length > 0 && !selectedStore) {
            onStoreSelect?.(places[0]);
        }
    }, [places.length]);

    const initializeMap = useCallback(() => {
        if (!mapRef.current || places.length === 0 || !window.naver || isMapInitializedRef.current) {
            return;
        }

        try {
            const options = {
                center: new window.naver.maps.LatLng(
                    places[0].lat,
                    places[0].lng
                ),
                zoom: 16,
                scaleControl: false,
                logoControl: true,
                mapDataControl: false,
                zoomControl: false,
                mapTypeControl: false,
                logoControlOptions: {
                    position: window.naver.maps.Position.TOP_LEFT
                }
            };

            const mapInstance = new window.naver.maps.Map(mapRef.current, options);
            setMap(mapInstance);

            window.naver.maps.Event.addListener(mapInstance, 'click', () => {
                if (onStoreSelect) {
                    onStoreSelect(null);
                }
            });

            isMapInitializedRef.current = true;

        } catch (error) {
            setMapError(`Failed to initialize map: ${(error as Error).message}`);
        }
    }, [places, onStoreSelect]);

    const setBoundsForAllPlaces = useCallback((mapInstance: any) => {
        if (!mapInstance || places.length === 0 || isBoundsSetRef.current) return;

        const bounds = new window.naver.maps.LatLngBounds();
        places.forEach(place => {
            bounds.extend(new window.naver.maps.LatLng(place.lat, place.lng));
        });

        mapInstance.fitBounds(bounds);
        isBoundsSetRef.current = true;
    }, [places]);

    const createMarkers = useCallback(() => {
        if (!map || !window.naver || places.length === 0) return;

        Object.values(markersRef.current).forEach(marker => marker.setMap(null));
        markersRef.current = {};

        places.forEach(place => {
            const marker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(place.lat, place.lng),
                map: map,
                zIndex: 1,
                icon: {
                    content: '<div class="cs_mapbridge"><div class="map_marker"><img class="marker_thumb_img" src="/assets/mapPinRed.png" alt="기본 마커" style="-webkit-user-drag: none; user-select: none;"></div></div>',
                    anchor: new window.naver.maps.Point(12, 38),
                },
            });

            window.naver.maps.Event.addListener(marker, 'click', (e: any) => {
                e.pointerEvent?.stopPropagation?.();
                if (onStoreSelect) {
                    onStoreSelect(place);
                }
            });

            markersRef.current[place.storeId] = marker;
        });

        setBoundsForAllPlaces(map);

    }, [map, places]);

    const updateMarkerIcons = useCallback(() => {
        if (!map || !window.naver) return;

        Object.entries(markersRef.current).forEach(([storeId, marker]) => {
            const isSelected = storeId === selectedStore?.storeId;
            marker.setZIndex(isSelected ? 100 : 1);
            marker.setIcon(isSelected ? {
                content: '<img src="/assets/mapPin.png" alt="Selected Pin" style="width:38px; height:50px;  min-width:38px;" />',
                anchor: new window.naver.maps.Point(20, 40),
            } : {
                content: '<div class="cs_mapbridge"><div class="map_marker"><img style="width:23px; height:28px;" src="/assets/mapPinRed.png" alt="기본 마커"></div></div>',
                anchor: new window.naver.maps.Point(12, 38),
            });
        });
    }, [map, selectedStore]);

    useEffect(() => {
        if (isLoaded && window.naver && places.length > 0 && !isMapInitializedRef.current) {
            initializeMap();
        }
    }, [isLoaded, initializeMap]);

    useEffect(() => {
        if (map && places.length > 0) {
            createMarkers();
        }
    }, [map, places, createMarkers]);

    useEffect(() => {
        if (map && Object.keys(markersRef.current).length > 0) {
            updateMarkerIcons();
        }
    }, [selectedStore, updateMarkerIcons]);


    const handleScriptLoad = () => {
        if (places.length > 0 && !isMapInitializedRef.current) {
            initializeMap();
        }
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
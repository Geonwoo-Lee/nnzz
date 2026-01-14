'use client'
import React, { useEffect, useRef, useState, useCallback } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useNaverMapLoaded } from "@/src/hooks/useNaverMapLoaded";

export interface MapPlace {
    name: string;
    lat: number;
    lng: number;
    address?: string;
}

interface Props {
    places: MapPlace[]
    pinAble?: boolean
    onPinUpdated?: (lat: number, lng: number) => void
}

const NaverMap: React.FC<Props> = ({ places, pinAble, onPinUpdated }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const path = usePathname();
    const [map, setMap] = useState<any>(null);
    const [marker, setMarker] = useState<any>(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const { isLoaded } = useNaverMapLoaded();


    const initializeMap = useCallback(() => {
        if (!mapRef.current || places.length === 0 || !window.naver) return;

        try {
            if (!map) {
                const options = {
                    center: new window.naver.maps.LatLng(places[0].lat, places[0].lng),
                    zoom: 13,
                };
                const newMap = new window.naver.maps.Map(mapRef.current, options);
                setMap(newMap);

                const initialMarker = new window.naver.maps.Marker({
                    position: new window.naver.maps.LatLng(places[0].lat, places[0].lng),
                    map: newMap,
                    icon: {
                        content: '<img src="/assets/mapPin2.png" alt="Map Pin" style="width:40px; height:51px; min-width: 40px;" />',
                        anchor: new window.naver.maps.Point(20, 40),
                    },
                });
                setMarker(initialMarker);

                if (pinAble) {
                    window.naver.maps.Event.addListener(newMap, 'click', (e: any) => {
                        const latlng = e.coord;
                        initialMarker.setPosition(latlng);
                        if (onPinUpdated) {
                            onPinUpdated(latlng.lat(), latlng.lng());
                        }
                    });
                }
            } else {
                const newPosition = new window.naver.maps.LatLng(places[0].lat, places[0].lng);
                map.setCenter(newPosition);
                if (marker) {
                    marker.setPosition(newPosition);
                }
            }

            if (places.length > 1) {
                const bounds = new window.naver.maps.LatLngBounds();
                places.forEach(place => {
                    bounds.extend(new window.naver.maps.LatLng(place.lat, place.lng));
                });
                map.fitBounds(bounds);
            }
        } catch (error) {
        }
    }, [map, marker, places, pinAble, onPinUpdated]);

    useEffect(() => {
        if (isLoaded && window.naver && places.length > 0) {
            initializeMap();
        }
    }, [isLoaded, places, path, initializeMap]);

    const handleScriptLoad = () => {
        setScriptLoaded(true);
        initializeMap();
    };


    return (
        <div>
            {!isLoaded &&  (
                <Script
                    src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
                    onLoad={handleScriptLoad}
                    strategy="afterInteractive"
                />
            )}
            <div className="flex items-center justify-center w-[100vw] h-[100vh]">
                {!scriptLoaded && !isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
                            <p className="mt-4 text-gray-600">네이버 지도를 불러오는 중...</p>
                        </div>
                    </div>
                )}
                <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
            </div>
        </div>
    );
};

export default NaverMap;
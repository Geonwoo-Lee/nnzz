'use client'
import React, { useEffect, useRef, useState, useCallback } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

export interface MapPlace {
    name: string;
    lat: number;
    lng: number;
}

interface Props {
    places: MapPlace[]
    pinAble?: boolean
    onPinUpdated?: (lat: number, lng: number) => void
}

let isNaverMapScriptLoaded = false;

const NaverMap: React.FC<Props> = ({ places, pinAble, onPinUpdated }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const path = usePathname()
    const [mapError, setMapError] = useState<string | null>(null);
    const [map, setMap] = useState<any>(null);
    const [marker, setMarker] = useState<any>(null);

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
                        content: '<img src="/assets/mapPin.png" alt="Map Pin" style="width:40px; height:40px;" />',
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
                // 기존 지도 객체가 있으면 중심점만 업데이트
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
            setMapError(`Failed to initialize map: ${(error as Error).message}`);
        }
    }, [map, marker, places, pinAble, onPinUpdated]);

    useEffect(() => {
        if (isNaverMapScriptLoaded && window.naver && places.length > 0) {
            initializeMap();
        }
    }, [isNaverMapScriptLoaded, places, path, initializeMap]);

    const handleScriptLoad = () => {
        isNaverMapScriptLoaded = true;
        initializeMap();
    };

    if (mapError) {
        return <div>Error: {mapError}</div>;
    }

    return (
        <div>
            {!isNaverMapScriptLoaded && (
                <Script
                    src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
                    onLoad={handleScriptLoad}
                    strategy="afterInteractive"
                    onError={() => {
                        setMapError('Failed to load Naver Maps script');
                    }}
                />
            )}
            <div className="flex items-center justify-center w-[100vw] h-[100vh]">
                <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
            </div>
        </div>
    );
};

export default NaverMap;
'use client'
import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface Place {
    name: string;
    lat: number;
    lng: number;
}

interface Props {
    places: Place[]
}

const NaverMap: React.FC<Props> = ({ places }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [mapError, setMapError] = useState<string | null>(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [isNaverInitialized, setIsNaverInitialized] = useState(false);

    useEffect(() => {
        if (isScriptLoaded && (window as any).naver && !isNaverInitialized) {
            setIsNaverInitialized(true);
        }
    }, [isScriptLoaded, isNaverInitialized]);

    useEffect(() => {
        if (!isNaverInitialized || !mapRef.current || places.length === 0) return;

        const loadMap = () => {
            try {
                const options = {
                    center: new (window as any).naver.maps.LatLng(places[0].lat, places[0].lng),
                    zoom: 13,
                };
                const map = new (window as any).naver.maps.Map(mapRef.current!, options);

                places.forEach((place) => {
                    const position = new (window as any).naver.maps.LatLng(place.lat, place.lng);
                    const customIcon = {
                        content: '<img src="/assets/mapPin.png" alt="Custom Map Pin" style="width:40px; height:40px;" />', // 크기는 필요에 따라 조정
                        anchor: new (window as any).naver.maps.Point(20, 40), // 핀의 끝부분이 좌표에 오도록 앵커 설정
                    };


                    const marker = new (window as any).naver.maps.Marker({
                        map: map,
                        position: position,
                        icon: customIcon,
                    });

                    const infowindow = new (window as any).naver.maps.InfoWindow({
                        content: `<div style="width:200px;text-align:center;padding:6px 0;">
                        <strong>${place.name}</strong><br>
                        Lat: ${place.lat}, Lng: ${place.lng}
                      </div>`,
                    });

                    (window as any).naver.maps.Event.addListener(marker, 'mouseover', () => {
                        infowindow.open(map, marker);
                    });
                    (window as any).naver.maps.Event.addListener(marker, 'mouseout', () => {
                        infowindow.close();
                    });
                });

                // Fit bounds
                if (places.length > 1) {
                    const bounds = new (window as any).naver.maps.LatLngBounds();
                    places.forEach(place => {
                        bounds.extend(new (window as any).naver.maps.LatLng(place.lat, place.lng));
                    });
                    map.fitBounds(bounds);
                }
            } catch (error) {
                setMapError(`Failed to initialize map: ${(error as Error).message}`);
            }
        };

        setTimeout(loadMap, 100);

    }, [places, isNaverInitialized]);

    const handleScriptLoad = () => {
        setIsScriptLoaded(true);
    };

    if (mapError) {
        return <div>Error: {mapError}</div>;
    }

    return (
        <div>
            <Script
                src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
                onLoad={handleScriptLoad}
                onError={() => {
                    setMapError('Failed to load Naver Maps script');
                }}
            />
            <div className="flex items-center justify-center pt-2">
                <div ref={mapRef} style={{ width: "95%", height: "300px" }} />
            </div>
        </div>
    );
};

export default NaverMap;
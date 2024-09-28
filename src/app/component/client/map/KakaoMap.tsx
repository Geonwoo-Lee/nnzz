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

const KakaoMap: React.FC<Props> = ({ places }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [mapError, setMapError] = useState<string | null>(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);

    useEffect(() => {
        if (isScriptLoaded && window.kakao && !isKakaoInitialized) {
            window.kakao.maps.load(() => {
                setIsKakaoInitialized(true);
            });
        }
    }, [isScriptLoaded, isKakaoInitialized]);

    useEffect(() => {
        if (!isKakaoInitialized || !mapRef.current || places.length === 0) return;

        const loadMap = () => {
            try {
                const options = {
                    center: new window.kakao.maps.LatLng(places[0].lat, places[0].lng),
                    level: 3,
                };
                const map = new window.kakao.maps.Map(mapRef.current!, options);
                const bounds = new window.kakao.maps.LatLngBounds();

                places.forEach((place) => {
                    const position = new window.kakao.maps.LatLng(place.lat, place.lng);

                    const marker = new window.kakao.maps.Marker({
                        map: map,
                        position: position,
                    });

                    const infowindow = new window.kakao.maps.InfoWindow({
                        content: `<div style="width:200px;text-align:center;padding:6px 0;">
                        <strong>${place.name}</strong><br>
                        Lat: ${place.lat}, Lng: ${place.lng}
                      </div>`,
                    });

                    window.kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
                    window.kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());

                    bounds.extend(position);
                });

                (map as any).setBounds(bounds);
            } catch (error) {
                setMapError(`Failed to initialize map: ${(error as Error).message}`);
            }
        };

        // Add a small delay to ensure the map container is fully rendered
        setTimeout(loadMap, 100);

    }, [places, isKakaoInitialized]);

    const handleScriptLoad = () => {
        setIsScriptLoaded(true);
    };

    if (mapError) {
        return <div>Error: {mapError}</div>;
    }

    return (
        <div>
            <Script
                src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false`}
                onLoad={handleScriptLoad}
                onError={(e) => {
                    setMapError('Failed to load Kakao Maps script');
                }}
            />
            <div className="flex items-center justify-center pt-2">
                <div ref={mapRef} style={{ width: "95%", height: "300px" }} />
            </div>
        </div>
    );
};

export default KakaoMap;
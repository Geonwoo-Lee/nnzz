// global.d.ts

interface KakaoMapStatic {
    maps: {
        load(callback: () => void): void;
        Map: {
            new (container: HTMLElement, options: KakaoMapOptions): KakaoMap;
        };
        LatLng: {
            new (lat: number, lng: number): KakaoLatLng;
        };
        Marker: {
            new (options: KakaoMarkerOptions): KakaoMarker;
        };
        InfoWindow: {
            new (options: KakaoInfoWindowOptions): KakaoInfoWindow;
        };
        event: {
            addListener(target: any, type: string, callback: Function): void;
        };
        LatLngBounds: {
            new (): KakaoLatLngBounds;
        };
    };
}

interface KakaoMapOptions {
    center: KakaoLatLng;
    level: number;
}

interface KakaoLatLng {
    getLat(): number;
    getLng(): number;
}

interface KakaoMarkerOptions {
    map?: KakaoMap;
    position: KakaoLatLng;
}

interface KakaoInfoWindowOptions {
    content: string;
}

interface KakaoMap {
    setCenter(latlng: KakaoLatLng): void;
    setLevel(level: number): void;
    getLevel(): number;
    setMapTypeId(mapTypeId: number): void;
    panTo(latlng: KakaoLatLng): void;
}

interface KakaoMarker {
    setMap(map: KakaoMap | null): void;
    setPosition(position: KakaoLatLng): void;
    setVisible(visible: boolean): void;
}

interface KakaoInfoWindow {
    open(map: KakaoMap, marker: KakaoMarker): void;
    close(): void;
}

interface KakaoLatLngBounds {
    extend(latlng: KakaoLatLng): void;
}

interface Window {
    kakao: KakaoMapStatic;
}
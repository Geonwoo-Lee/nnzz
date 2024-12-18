// global.d.ts
interface KakaoMouseEvent {
    latLng: KakaoLatLng;
    point: { x: number; y: number };
}

interface KakaoEventMap {
    // 지도 이벤트
    'center_changed': () => void;
    'zoom_start': () => void;
    'zoom_changed': () => void;
    'bounds_changed': () => void;
    'click': (mouseEvent: KakaoMouseEvent) => void;
    'dblclick': (mouseEvent: KakaoMouseEvent) => void;
    'rightclick': (mouseEvent: KakaoMouseEvent) => void;
    'mousemove': (mouseEvent: KakaoMouseEvent) => void;
    'dragstart': () => void;
    'drag': () => void;
    'dragend': () => void;
    'idle': () => void;
    'tilesloaded': () => void;
    'maptypeid_changed': () => void;

    // 마커 이벤트
    'marker_click': (marker: KakaoMarker) => void;
    'marker_mouseover': (marker: KakaoMarker) => void;
    'marker_mouseout': (marker: KakaoMarker) => void;
    'marker_rightclick': (marker: KakaoMarker) => void;

    // 인포윈도우 이벤트
    'infowindow_domready': () => void;
    'infowindow_close': () => void;

    // 폴리곤 이벤트
    'polygon_click': (polygon: any) => void;
    'polygon_mouseover': (polygon: any) => void;
    'polygon_mouseout': (polygon: any) => void;

    // 폴리라인 이벤트
    'polyline_click': (polyline: any) => void;
    'polyline_mouseover': (polyline: any) => void;
    'polyline_mouseout': (polyline: any) => void;

    // 원 이벤트
    'circle_click': (circle: any) => void;
    'circle_mouseover': (circle: any) => void;
    'circle_mouseout': (circle: any) => void;

    // 사각형 이벤트
    'rectangle_click': (rectangle: any) => void;
    'rectangle_mouseover': (rectangle: any) => void;
    'rectangle_mouseout': (rectangle: any) => void;

    // 커스텀 오버레이 이벤트
    'custom_click': (customOverlay: any) => void;
    'custom_mouseover': (customOverlay: any) => void;
    'custom_mouseout': (customOverlay: any) => void;

    // 그 외 모든 문자열 키에 대한 기본 이벤트 핸들러 타입
    [key: string]: (...args: any[]) => void;
}

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
            addListener<T extends keyof KakaoEventMap>(
                target: any,
                type: T,
                callback: KakaoEventMap[T]
            ): void;
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

interface KakaoLoginOptions {
    success: (authObj?: any) => void;
    fail: (error: any) => void;
    scope?: string;
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

// global.d.ts
interface KakaoStatic {
    init(appKey: string): void;
    isInitialized(): boolean;
    maps: any;
    Auth: {
        authorize(options: { redirectUri: string }): void;
        getStatusInfo(): Promise<{ status: string }>;
        setAccessToken(token: string): void;
        loginForm(options: {
            success: (authObj: any) => void;
            fail: (error: any) => void;
        }): void;
        login(options: KakaoLoginOptions): void;
    };
    API: {
        request(options: {
            url: string;
            success: (response: any) => void;
            fail: (error: any) => void;
        }): void;
    };
}

interface NaverMapModule {
    Map: any;
    LatLng: any;
    Marker: any;
    Event: any;
    LatLngBounds: any;
    Point: any
    Position: any
}


interface Window {
    kakao: KakaoMapStatic;
    Kakao: KakaoStatic;
    naver: {
        maps: NaverMapModule;
    };
}
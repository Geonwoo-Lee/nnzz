import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // 창 포커스시 자동으로 다시 가져오지 않음
            refetchOnReconnect: false, // 재연결시 자동으로 다시 가져오지 않음
            retry: 1, // 실패시 1번만 재시도
            staleTime: 5 * 60 * 1000, // 5분
        },
    },
});
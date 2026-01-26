import AuthUtils from "@/src/func/common/auth.utils";

const apiKeyRaw = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_KEY || "";
const apiKey = apiKeyRaw.endsWith('/') ? apiKeyRaw.slice(0, -1) : apiKeyRaw;

interface ErrorResponse {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  timestamp: string;
  message: string;
}

async function customFetch(url: string, options: RequestInit = {}, useToken: boolean = true): Promise<Response> {
  // URL에서 API 경로만 추출 (http://... 제거)
  let apiPath = url;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      const urlObj = new URL(url);
      apiPath = urlObj.pathname + urlObj.search;
    } catch (e) {
      // URL 파싱 실패 시 원본 사용
    }
  }

  // 직접 API 서버로 요청
  const fullUrl = `${apiKey}${apiPath}`;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (useToken) {
    const tokenObj = AuthUtils.getToken();
    if (tokenObj?.accessToken) {
      defaultHeaders['Authorization'] = tokenObj.accessToken;
    }
  }

  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers as Record<string, string>),
    },
  };

  try {
    const response = await fetch(fullUrl, mergedOptions);

    if (!response.ok) {
      let errorMessage = `HTTP Error ${response.status}`;

      try {
        const errorData: ErrorResponse = await response.json();
        errorMessage = errorData.detail || errorMessage;
      } catch (e) {
        console.log('Failed to parse error response:', e);
      }

      const error = new Error(errorMessage);
      (error as any).status = response.status;
      throw error;
    }

    return response;
  } catch (error) {
    // 네트워크 에러 처리
    if (error instanceof Error && error.message === 'Failed to fetch') {
      // 토큰이 있는 요청인데 네트워크 에러면 401로 간주 (임시방편)
      if (useToken) {
        const customError = new Error('Unauthorized - Network Error');
        (customError as any).status = 401;
        throw customError;
      }
    }
    throw error;
  }
}

export function fetchWithoutToken(url: string, options: RequestInit = {}): Promise<Response> {
  return customFetch(url, options, false);
}

export function fetchWithToken(url: string, options: RequestInit = {}): Promise<Response> {
  return customFetch(url, options, true);
}
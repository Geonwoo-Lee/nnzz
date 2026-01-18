// 간단한 인메모리 캐시
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

class MemoryCache {
  private cache: Map<string, CacheItem<any>> = new Map();
  private defaultTTL = 5 * 60 * 1000; // 5분

  set<T>(key: string, data: T, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now() + (ttl || this.defaultTTL),
    });
  }

  get<T>(key: string, allowStale = false): T | null {
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    // allowStale이 true면 만료된 데이터도 반환
    if (allowStale) {
      return item.data as T;
    }

    if (Date.now() > item.timestamp) {
      // 만료되었지만 삭제하지 않고 유지 (재시도 실패 시 사용 가능)
      return null;
    }

    return item.data as T;
  }

  clear(key?: string): void {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;

    if (Date.now() > item.timestamp) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }
}

export const memoryCache = new MemoryCache();

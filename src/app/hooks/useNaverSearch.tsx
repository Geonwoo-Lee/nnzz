'use client'
import { useState } from 'react';

export interface ClientConfig {
    naverClientId: string;
    gaId: string;
}


export function useNaverSearch() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchBlog = async (query: string, display: number = 10, start: number = 1) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/naver/search-blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query, display, start }),
            });

            if (!response.ok) {
                throw new Error('Blog search failed');
            }

            return await response.json();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Blog search failed';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const searchNews = async (query: string, display: number = 10, start: number = 1) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/naver/search-news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query, display, start }),
            });

            if (!response.ok) {
                throw new Error('News search failed');
            }

            return await response.json();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'News search failed';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const searchLocal = async (query: string, display: number = 5, start: number = 1) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/naver/search-local', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query, display, start }),
            });

            if (!response.ok) {
                throw new Error('Local search failed');
            }

            return await response.json();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Local search failed';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { searchBlog, searchNews, searchLocal, loading, error };
}
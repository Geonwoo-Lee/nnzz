import {FoodItem} from "@/src/types/models/food";
import { Block } from 'notion-types'


export class ImagePreloader {
    private static preloadedUrls = new Set<string>();
    private static bgImagesPreloaded = false;

    static preloadBackgrounds(): void {
        if (typeof window === 'undefined') return;
        if (this.bgImagesPreloaded) return;

        const bgImages: string[] = ['Pink', 'Yellow', 'Red', 'Green', 'Blue', 'Black'];
        bgImages.forEach(bg => {
            this.preloadSingleImage(`/images/bg/${bg}.png`);
        });

        this.bgImagesPreloaded = true;
    }

    static preloadNearbyImages(
        cards: FoodItem[],
        currentIndex: number,
        range: number = 3
    ): void {
        if (typeof window === 'undefined') return;
        if (!cards || cards.length === 0) return;

        this.preloadBackgrounds();

        const start = Math.max(0, currentIndex - range);
        const end = Math.min(cards.length, currentIndex + range + 1);

        for (let i = start; i < end; i++) {
            if (cards[i] && cards[i].imageUrl) {
                this.preloadSingleImage(cards[i].imageUrl);
            }
        }
    }

    private static preloadSingleImage(url: string): void {
        if (this.preloadedUrls.has(url)) return;

        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        document.head.appendChild(link);

        this.preloadedUrls.add(url);
    }

    static preloadInitialImages(cards: FoodItem[], count: number = 5): void {
        this.preloadNearbyImages(cards, 0, count);
    }
}


export const customMapImageUrl = (url: string, block: Block): string => {
    if (!url) {
        throw new Error("URL can't be empty")
    }

    if (url.startsWith('data:')) {
        return url
    }

    // more recent versions of notion don't proxy unsplash images
    if (url.startsWith('https://images.unsplash.com')) {
        return url
    }

    try {
        const u = new URL(url)

        if (
            u.pathname.startsWith('/secure.notion-static.com') &&
            u.hostname.endsWith('.amazonaws.com')
        ) {
            if (
                u.searchParams.has('X-Amz-Credential') &&
                u.searchParams.has('X-Amz-Signature') &&
                u.searchParams.has('X-Amz-Algorithm')
            ) {
                url = u.origin + u.pathname
            }
        }
    } catch {
    }

    if (url.startsWith('/images')) {
        url = `https://www.notion.so${url}`
    }

    url = `https://www.notion.so${
        url.startsWith('/image') ? url : `/image/${encodeURIComponent(url)}`
    }`

    const notionImageUrlV2 = new URL(url)
    let table = block.parent_table === 'space' ? 'block' : block.parent_table
    if (table === 'collection' || table === 'team') {
        table = 'block'
    }
    notionImageUrlV2.searchParams.set('table', table)
    notionImageUrlV2.searchParams.set('id', block.id)
    notionImageUrlV2.searchParams.set('cache', 'v2')

    url = notionImageUrlV2.toString()

    return url
}

import {FoodItem} from "@/src/app/types/models/food";


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
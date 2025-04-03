import { createIsomorphicFn } from "@tanstack/solid-start";

export function preloadImage(src: string): Promise<void> {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
    });
}

export const preloadImageIds = createIsomorphicFn().client((ids: number[], size: number) => {
    return Promise.all(ids.map((id) => preloadImage(`https://picsum.photos/id/${id}/${size}`)));
});
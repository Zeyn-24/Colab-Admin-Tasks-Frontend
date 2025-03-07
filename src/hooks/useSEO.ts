import { useEffect } from "react"

export const useSEO = (title: string) => {
    useEffect(() => {
        document.title = `${title} - Colab Admin Tasks`
        document
            .querySelector('meta[name="description"]')
            ?.setAttribute('content', 'Find the best events in the world. Music, sports, conferences, and more');
    }, [title]);
}
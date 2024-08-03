import { useRef } from "react"

export const useQuotes = () => {
    const availableQuotes = useRef([""]);

    const getQuote = () => {
        return availableQuotes.current[0];
    }

    return [getQuote];
}
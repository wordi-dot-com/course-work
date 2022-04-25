import {useCallback, useRef} from "react";

export const useDebounce = (func: () => void, ms: number): () => void => {
    const timeoutRef = useRef();

    return useCallback(() => {
        clearTimeout(timeoutRef.current);

        // @ts-ignore
        timeoutRef.current = setTimeout(func, ms)
    }, [func, ms])
}

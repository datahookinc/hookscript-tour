import { useEffect, useState } from 'react';

export function useCompiler() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (globalThis.compilerIsReady) {
            setIsReady(true);
            return;
        }

        // long polling because the component will often mount before the script runs
        const si = setInterval(() =>  {
            if (globalThis.compilerIsReady) {
                setIsReady(true);
                clearInterval(si);
            }
        }, 100);

        return () => {
            clearInterval(si);
        }
    }, [])
    return isReady;
}
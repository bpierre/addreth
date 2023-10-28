import { useEffect, useState } from "react";

export function useImageLoaded(src: string | null) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(false);
    if (!src) return;

    let cancelled = false;
    const image = new Image();
    image.onload = () => {
      if (!cancelled) {
        setLoaded(true);
      }
    };
    image.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  return loaded;
}

import { useInsertionEffect } from "react";

declare global {
  interface Window {
    _ADDRETH_CSS?: string;
  }
}

function getStyle(id: string) {
  return document.getElementById(id) ?? document.head.appendChild(
    Object.assign(document.createElement("style"), {
      id,
      innerHTML: typeof window !== "undefined" && window._ADDRETH_CSS || "",
    }),
  );
}

let mountCount = 0;
export function useInjectCss(id = "addreth-styles") {
  useInsertionEffect(() => {
    const style = getStyle(id);
    mountCount++;
    return () => {
      if (--mountCount === 0) {
        style.remove();
      }
    };
  }, [id]);
}

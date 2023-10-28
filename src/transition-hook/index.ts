// Source: https://github.com/iamyoki/transition-hook
// Author: Yoki @iamyoki
// License: MIT

import { useEffect, useState } from "react";

type Stage = "from" | "enter" | "leave";

type Canceller = {
  id?: number;
};

export function useTransition(state: boolean, timeout: number) {
  const [stage, setStage] = useState<Stage>(state ? "enter" : "from");
  const [shouldMount, setShouldMount] = useState(state);

  useEffect(function handleStateChange() {
    let timer: Canceller = {};

    // when true - "from" to "enter"
    // when false - "enter" to "leave", unmount after timeout
    if (state) {
      setStage("from");
      setShouldMount(true);
      timer = setAnimationFrameTimeout(() => {
        setStage("enter");
      });
    } else {
      setStage("leave");
      timer = setAnimationFrameTimeout(() => {
        setShouldMount(false);
      }, timeout);
    }

    return () => {
      clearAnimationFrameTimeout(timer);
    };
  }, [state, timeout]);

  return {
    stage,
    shouldMount,
  };
}

function setAnimationFrameTimeout(callback: () => void, timeout: number = 0) {
  const startTime = performance.now();
  const canceller: Canceller = {};
  function call() {
    canceller.id = requestAnimationFrame((now) => {
      if (now - startTime > timeout) {
        callback();
      } else {
        call();
      }
    });
  }
  call();
  return canceller;
}

function clearAnimationFrameTimeout(canceller: Canceller) {
  if (canceller.id) {
    cancelAnimationFrame(canceller.id);
  }
}

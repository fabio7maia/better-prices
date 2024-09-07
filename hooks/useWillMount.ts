import React from "react";

export const useWillMount = (callback: () => void) => {
  const willMount = React.useRef(false);

  if (!willMount.current) {
    willMount.current = true;
    callback();
  }
};

import React from "react";

export const useDidMount = (callback: () => void) => {
  React.useEffect(() => {
    callback();
  }, []);
};

import { AppContext } from "@/providers/app";
import React from "react";

export const useApp = () => {
  return React.useContext(AppContext);
};

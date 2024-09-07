import { Href, router } from "expo-router";

export const useNavigation = () => {
  return {
    back: () => {
      router.back();
    },
    navigate: (path: Href) => {
      router.navigate(path);
    },
    push: (path: Href) => {
      router.push(path);
    },
    replace: (path: Href) => {
      router.replace(path);
    },
  };
};

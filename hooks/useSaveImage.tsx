import * as MediaLibrary from "expo-media-library";

export const useSaveImage = () => {
  return {
    saveImage: async (
      uri: string,
      {
        onError,
        onSuccess,
      }: { onSuccess?: () => void; onError?: (error: unknown) => void } = {}
    ) => {
      try {
        // Request device storage access permission
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === "granted") {
          // Save image to media library
          await MediaLibrary.saveToLibraryAsync(uri);

          onSuccess?.();
        }
      } catch (error) {
        onError?.(error);
      }
    },
  };
};

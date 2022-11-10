import { useState, useCallback, useEffect } from "react";

import * as ImagePicker from "expo-image-picker";

interface Navigation {
  goBack: () => void;
}

interface MediaControlHookProps {
  initialNavigation?: Navigation;
}

interface MediaControlsProperties {
  currentImageIndex: number;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedImages: string[];
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>;
  setNavigation: React.Dispatch<React.SetStateAction<Navigation | undefined>>;
  onSwiperIndexChange: (index: number) => void;
  deleteSelection: () => void;
  cancelSelection: () => void;
  selectImageFromCamera: () => Promise<void>;
  selectImageFromGallery: () => Promise<void>;
}

export function useMediaControls({
  initialNavigation,
}: MediaControlHookProps): MediaControlsProperties {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [navigation, setNavigation] = useState<Navigation | undefined>(
    undefined
  );

  useEffect(() => setNavigation(initialNavigation), []);

  const onSwiperIndexChange = useCallback(
    (index: number) => {
      setCurrentImageIndex(index);
    },
    [setCurrentImageIndex]
  );

  const cancelSelection = useCallback(() => {
    setSelectedImages([]);
    navigation?.goBack();
  }, [navigation?.goBack, setSelectedImages]);

  const deleteSelection = useCallback(() => {
    const nextImageIndex = currentImageIndex === 0 ? 0 : currentImageIndex - 1;

    setSelectedImages(
      selectedImages.filter((_, index) => index !== currentImageIndex)
    );
    setCurrentImageIndex(nextImageIndex);
    if (selectedImages.length === 1) cancelSelection();
  }, [
    setSelectedImages,
    setCurrentImageIndex,
    cancelSelection,
    navigation?.goBack,
    selectedImages,
    currentImageIndex,
  ]);

  const selectImageFromGallery = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5 - selectedImages.length,
      orderedSelection: true,
      quality: 0.1,
    });

    if (!result.cancelled) {
      setSelectedImages([
        ...selectedImages,
        ...result.selected.map((image) => image.uri),
      ]);
    }
  }, [
    selectedImages.length,
    selectedImages,
    setSelectedImages,
    ImagePicker.launchImageLibraryAsync,
    ImagePicker.MediaTypeOptions.Images,
  ]);

  const selectImageFromCamera = useCallback(async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImages([...selectedImages, result.uri]);
    }
  }, [
    ImagePicker.requestCameraPermissionsAsync,
    ImagePicker.launchCameraAsync,
    setSelectedImages,
    selectedImages,
  ]);

  return {
    currentImageIndex,
    cancelSelection,
    setCurrentImageIndex,
    selectedImages,
    setSelectedImages,
    setNavigation,
    onSwiperIndexChange,
    deleteSelection,
    selectImageFromCamera,
    selectImageFromGallery,
  };
}

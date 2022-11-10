import React, { useCallback, useEffect, useState } from "react";

import * as ImagePicker from "expo-image-picker";
import { ImageSelectorControl } from "../components/chat/ImageSelectorControl";

const MediaSelectionControlScreen = (props: any): JSX.Element => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const onSwiperIndexChange = useCallback(
    (index: number) => {
      console.log("swiper index change", index);
      setCurrentImageIndex(index);
    },
    [setCurrentImageIndex]
  );

  const cancelSelection = useCallback(() => {
    props.navigation.goBack();
  }, [props.navigation?.goBack]);

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
    props.navigation.navigate,
  ]);

  useEffect(() => {
    setSelectedImages(props.route.params.images);
    console.log(props.route.params.images);
  }, [props?.route?.params?.images]);

  return (
    <ImageSelectorControl
      onCancelClick={cancelSelection}
      onDeleteClick={deleteSelection}
      selectImageFromCamera={selectImageFromCamera}
      selectImageFromGallery={selectImageFromGallery}
      onSwiperIndexChange={onSwiperIndexChange}
      selectedImagesURI={selectedImages}
      currentImageIndex={currentImageIndex}
    />
  );
};

export default MediaSelectionControlScreen;

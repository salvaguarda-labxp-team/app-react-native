import React, { useEffect } from "react";

import { ImageSelectorControl } from "../components/chat/ImageSelectorControl";
import { useMediaControls } from "../hooks/useMediaControl";

const MediaSelectionControlScreen = (props: any): JSX.Element => {
  const {
    cancelSelection,
    setSelectedImages,
    deleteSelection,
    selectImageFromCamera,
    selectImageFromGallery,
    onSwiperIndexChange,
    setNavigation,
    selectedImages,
    currentImageIndex,
  } = useMediaControls(props.navigation);

  useEffect(() => setNavigation(props.navigation), [props.navigation]);

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

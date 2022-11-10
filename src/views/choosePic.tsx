import React, { useEffect } from "react";
import { MediaInput } from "../components/chat/MediaInput";
import { useMediaControls } from "../hooks/useMediaControl";

const ChooseImageExampleScreen: React.FC<{
  navigation: any;
}> = (props) => {
  const {
    setNavigation,
    setSelectedImages,
    selectedImages,
    selectImageFromCamera,
    selectImageFromGallery,
  } = useMediaControls(props.navigation);

  useEffect(() => setNavigation(props.navigation), [props.navigation]);

  useEffect(() => setSelectedImages([]), []);

  useEffect(() => {
    if (selectedImages.length > 0) {
      props.navigation.navigate("Add Image", { images: selectedImages });
      setSelectedImages([]);
    }
  }, [selectedImages]);

  return (
    <MediaInput
      navigation={props.navigation}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onAddClick={selectImageFromGallery}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onCameraClick={selectImageFromCamera}
      onMicClick={() => {}}
    />
  );
};

export default ChooseImageExampleScreen;

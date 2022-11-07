import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Image, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Swiper from "react-native-swiper";

interface ImageSelectorControlProps {
  onCancelClick: Function;
  onDeleteClick: Function;
  onPickImageClick: Function;
  onSwiperIndexChange: Function;
  selectedImagesURI: string[];
  currentImageIndex: number;
}

const ImageSelectorControl: React.FC<ImageSelectorControlProps> = ({
  onCancelClick,
  onDeleteClick,
  selectedImagesURI,
  onSwiperIndexChange,
  onPickImageClick,
  currentImageIndex,
}: any) => {
  const swiperImageViews = useMemo(
    () =>
      selectedImagesURI.map((newImage: string, index: number) => (
        <View
          key={index}
          style={{ width: "100%", height: "100%", shadowOpacity: 0 }}
        >
          <Image
            source={{ uri: newImage }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      )),
    [selectedImagesURI]
  );
  const controlBarImageViews = useMemo(
    () =>
      selectedImagesURI.map((newImage: string, index: number) => (
        <View
          key={index}
          style={{ width: "19%", height: "100%", marginRight: "1.25%" }}
        >
          <Image
            source={{ uri: newImage }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      )),
    [selectedImagesURI]
  );

  const controlBarItems = useMemo(() => {
    return controlBarImageViews.length > 5
      ? controlBarImageViews
      : [
          ...controlBarImageViews,
          <View
            key={controlBarImageViews.length}
            style={{
              width: "19%",
              height: "100%",
              marginRight: "1.25%",
              backgroundColor: "rgba(0,0,0,0.8)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons
              name="add-to-photos"
              size={40}
              color="white"
              onPress={onPickImageClick}
            />
          </View>,
        ];
  }, [controlBarImageViews, onPickImageClick]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />

      <Swiper
        loop={false}
        onIndexChanged={onSwiperIndexChange}
        index={currentImageIndex}
        key={selectedImagesURI.length}
      >
        {swiperImageViews}
      </Swiper>

      <View
        style={{ position: "absolute", top: 20, left: 20, shadowOpacity: 1 }}
      >
        <MaterialIcons
          name="cancel"
          size={40}
          color="white"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onPress={onCancelClick}
        />
      </View>

      <View
        style={{ position: "absolute", top: 20, right: 20, shadowOpacity: 1 }}
      >
        <MaterialIcons
          name="restore-from-trash"
          size={40}
          color="white"
          onPress={onDeleteClick}
        />
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "10%",
          backgroundColor: "rgba(0,0,0,0.4)",
          flexDirection: "row",
        }}
      >
        {controlBarItems}
      </View>
    </View>
  );
};

const DeviceImagePicker = (props: any): JSX.Element => {
  // const openCamera = async (): Promise<void> => {
  //   // Ask the user for the permission to access the camera
  //   const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  //   if (!permissionResult.granted) {
  //     alert("You've refused to allow this appp to access your camera!");
  //     return;
  //   }

  //   const result = await ImagePicker.launchCameraAsync();

  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //   }
  // };

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const onSwiperIndexChange = useCallback(
    (index: number) => {
      console.log("swiper index change", index);
      setCurrentImageIndex(index);
    },
    [setCurrentImageIndex]
  );

  const cancelSelection = (): void => {
    props.navigation.goBack();
  };
  const deleteSelection = async (): Promise<void> => {
    const nextImageIndex = currentImageIndex === 0 ? 0 : currentImageIndex - 1;

    setSelectedImages(
      selectedImages.filter((_, index) => index !== currentImageIndex)
    );
    setCurrentImageIndex(nextImageIndex);
    if (selectedImages.length === 1) cancelSelection();
  };

  const pickImage = useCallback(() => {
    // TODO implement open image selection
    console.log("oi");
  }, []);

  useEffect(
    () => setSelectedImages(props.route.params.images),
    [props?.route?.params?.images]
  );

  return (
    <ImageSelectorControl
      onCancelClick={cancelSelection}
      onDeleteClick={deleteSelection}
      onPickImageClick={pickImage}
      onSwiperIndexChange={onSwiperIndexChange}
      selectedImagesURI={selectedImages}
      currentImageIndex={currentImageIndex}
    />
  );
};

export default DeviceImagePicker;

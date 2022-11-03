import React, { useCallback, useMemo } from "react";
import { Image, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Swiper from "react-native-swiper";

const ImagePickerExample = (props: any): JSX.Element => {
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

  const cancelSelection = async (): Promise<void> => {
    // TODO implement selection cancelation
    console.log(displayItems);
  };

  const pickImage = useCallback(() => {
    // TODO implement open image selection
    console.log("oi");
  }, []);

  
  const displayImages = useMemo(
    () =>
      (props.route.params.images as string[]).map((newImage) => (
        <View style={{ width: "19%", height: "100%", marginRight: "1.25%" }}>
          <Image
            source={{ uri: newImage }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      )),
    [props?.route?.params?.images]
  );

  const displayItems = useMemo(() => {
    return displayImages.length > 5
      ? displayImages
      : [
          ...displayImages,
          <View
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
              onPress={pickImage}
            />
          </View>,
        ];
  }, [displayImages]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />

      <Swiper>
        <Image
          source={{ uri: props.route.params.images[0] }}
          style={{ width: "100%", height: "100%", shadowOpacity: 0 }}
        />

        <Image
          source={{ uri: props.route.params.images[1] }}
          style={{ width: "100%", height: "100%", shadowOpacity: 0 }}
        />
      </Swiper>

      <View
        style={{ position: "absolute", top: 20, left: 20, shadowOpacity: 1 }}
      >
        <MaterialIcons
          name="cancel"
          size={40}
          color="white"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onPress={cancelSelection}
        />
      </View>

      <View
        style={{ position: "absolute", top: 20, right: 20, shadowOpacity: 1 }}
      >
        <MaterialIcons name="restore-from-trash" size={40} color="white" />
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
        {displayItems}
      </View>
    </View>
  );
};

export default ImagePickerExample;

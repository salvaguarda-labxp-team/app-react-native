import React, { useMemo } from "react";

import { Image, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Swiper from "react-native-swiper";

interface ImageSelectorControlProps {
  onCancelClick: Function;
  onDeleteClick: Function;
  selectImageFromCamera: Function;
  selectImageFromGallery: Function;
  onSwiperIndexChange: Function;
  selectedImagesURI: string[];
  currentImageIndex: number;
}

interface ImageCollectionActionsProps {
  selectImageFromCamera: () => void;
  selectImageFromGallery: () => void;
}
interface SelectedImagesManagingActionsProps {
  onCancelClick: () => void;
  onDeleteClick: () => void;
}

interface ControlBarProps {
  selectedImagesURI: string[];
  currentImageIndex: number;
  selectImageFromGallery: () => void;
  selectImageFromCamera: () => void;
}

export const ImageCollectionActions: React.FC<ImageCollectionActionsProps> = ({
  selectImageFromCamera,
  selectImageFromGallery,
}) => {
  return (
    <View
      style={{
        width: "100%",
        height: 75,
        marginRight: 0,
        padding: 15,
        backgroundColor: "rgba(0,0,0,0.2)",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        left: 0,
        bottom: 75,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <MaterialIcons
        name="image"
        size={50}
        color="white"
        onPress={selectImageFromGallery}
      />
      <MaterialIcons
        name="camera-alt"
        size={50}
        color="white"
        onPress={selectImageFromCamera}
      />
    </View>
  );
};

export const SelectedImagesManagingActions: React.FC<
  SelectedImagesManagingActionsProps
> = ({ onCancelClick, onDeleteClick }) => {
  return (
    <>
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
    </>
  );
};

const ControlBar: React.FC<ControlBarProps> = ({
  selectedImagesURI,
  currentImageIndex,
  selectImageFromGallery,
  selectImageFromCamera,
}) => {
  const controlBarImageViews = useMemo(
    () =>
      selectedImagesURI.map((newImage: string, index: number) => (
        <View
          key={index}
          style={{
            width: "19%",
            height: "100%",
            marginRight: "1.25%",
            ...(index === currentImageIndex
              ? { borderColor: "cyan", borderWidth: 2, borderRadius: 5 }
              : {}),
          }}
        >
          <Image
            source={{ uri: newImage }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      )),
    [selectedImagesURI, currentImageIndex]
  );

  const controlBarItems = useMemo(() => {
    return controlBarImageViews.length >= 5
      ? controlBarImageViews
      : [
          ...controlBarImageViews,
          <ImageCollectionActions
            key={controlBarImageViews.length}
            {...{ selectImageFromGallery, selectImageFromCamera }}
          />,
        ];
  }, [
    controlBarImageViews.length,
    currentImageIndex,
    selectImageFromCamera,
    selectImageFromGallery,
  ]);
  return (
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
  );
};

export const ImageSelectorControl: React.FC<ImageSelectorControlProps> = ({
  onCancelClick,
  onDeleteClick,
  selectedImagesURI,
  onSwiperIndexChange,
  selectImageFromGallery,
  selectImageFromCamera,
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

      <SelectedImagesManagingActions
        {...{
          onCancelClick,
          onDeleteClick,
        }}
      />

      <ControlBar
        {...{
          currentImageIndex,
          selectedImagesURI,
          selectImageFromCamera,
          selectImageFromGallery,
        }}
      />
    </View>
  );
};

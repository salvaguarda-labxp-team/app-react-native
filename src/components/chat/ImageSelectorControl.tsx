import React, { useMemo } from "react";

import { Image, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import Swiper from "react-native-swiper";
import { ActionButton } from "../app/ActionButton";

interface ImageSelectorControlProps {
  onCancelClick: Function;
  onDeleteClick: Function;
  submitImages: () => void;
  selectImageFromCamera: Function;
  selectImageFromGallery: Function;
  onSwiperIndexChange: Function;
  selectedImagesURI: string[];
  currentImageIndex: number;
}

interface ImageCollectionActionsProps {
  selectImageFromCamera: () => void;
  selectImageFromGallery: () => void;
  submitImages: () => void;
  isCollectionVisible: boolean;
  isSubmitVisible: boolean;
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
  submitImages: () => void;
}

export const ImageCollectionActions: React.FC<ImageCollectionActionsProps> = ({
  selectImageFromCamera,
  selectImageFromGallery,
  submitImages,
  isCollectionVisible,
}) => {
  return (
    <View style={imageCollectionStyles.ActionsMenu}>
      <View style={imageCollectionStyles.CollectActionsContainer}>
        <ActionButton
          icon="image"
          isVisible={isCollectionVisible}
          onPress={selectImageFromGallery}
          style={{ marginRight: 15 }}
        />
        <ActionButton
          onPress={selectImageFromCamera}
          isVisible={isCollectionVisible}
          icon={"camera-alt"}
        />
      </View>
      <ActionButton onPress={submitImages} color={"#175ac1"} icon={"send"} />
    </View>
  );
};

const imageCollectionStyles = StyleSheet.create({
  ActionsMenu: {
    width: "100%",
    height: 75,
    marginRight: 0,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    left: 0,
    bottom: 90,
    display: "flex",
    flexDirection: "row",
  },
  CollectActionsContainer: {
    display: "flex",
    flexDirection: "row",
  },
});

export const SelectedImagesManagingActions: React.FC<
  SelectedImagesManagingActionsProps
> = ({ onCancelClick, onDeleteClick }) => {
  return (
    <>
      <View style={managingActionsStyles.ActionButtonContainerLeft}>
        <ActionButton
          testID="Cancel"
          icon="cancel"
          onPress={onCancelClick}
        />
      </View>

      <View style={managingActionsStyles.ActionButtonContainerRight}>
        <ActionButton
          testID="Delete"
          icon="restore-from-trash"
          onPress={onDeleteClick}
        />
      </View>
    </>
  );
};

const managingActionsStyles = StyleSheet.create({
  ActionButtonContainerLeft: { position: "absolute", top: 20, left: 15 },
  ActionButtonContainerRight: { position: "absolute", top: 20, right: 15 },
});

const ControlBar: React.FC<ControlBarProps> = ({
  selectedImagesURI,
  currentImageIndex,
  selectImageFromGallery,
  selectImageFromCamera,
  submitImages,
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

  return (
    <View style={controlBarStyles.ControlBar}>
      {controlBarImageViews}
      <ImageCollectionActions
        key={controlBarImageViews.length}
        isCollectionVisible={controlBarImageViews.length < 5}
        isSubmitVisible={controlBarImageViews.length > 0}
        {...{
          selectImageFromGallery,
          selectImageFromCamera,
          submitImages,
        }}
      />
    </View>
  );
};

const controlBarStyles = StyleSheet.create({
  ControlBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "10%",
    backgroundColor: "rgba(0,0,0,0.4)",
    flexDirection: "row",
  },
});

export const ImageSelectorControl: React.FC<ImageSelectorControlProps> = ({
  onCancelClick,
  onDeleteClick,
  submitImages,
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
        showsPagination={false}
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
          submitImages,
        }}
      />
    </View>
  );
};

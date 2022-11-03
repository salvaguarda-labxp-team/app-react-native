import React, { useEffect, useState } from "react";
import { Image, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Swiper from "react-native-swiper";

export default function ImagePickerExample(props): JSX.Element {
  const [selectedImages, setSelectedImages] = useState(null);

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

  const save = async (): Promise<void> => {
    Alert.alert("Imagem adicionada!");
  };

  const test = async (): Promise<void> => {
   console.log(selectedImages);
  };

  // const addImage = async (): Promise<void> => {

  //   let images: any[] = [];

  //     props.route.params.images.forEach( (newImage: string) =>
  //       images.push(
  //         <View>
  //           <Image
  //                     source={{ uri: newImage }}
  //                     style={{ width: '10%', height: '10%'}}
  //                   />
  //         </View>
  //       )
  //     )
  //     setSelectedImages(images);
  // };
  useEffect( () => {
      let images: any[] = [];

        props.route.params.images.forEach( (newImage: string) =>
          images.push(
            <View style={{ width: '19%', height: '100%', marginRight: '1.25%'}}>
              <Image
                        source={{ uri: newImage }}
                        style={{ width: '100%', height: '100%'}}
                      />
            </View>
          )
        )

        if(images.length < 5){
          images.push(
            <View style={{ width: '19%', height: '100%', marginRight: '1.25%', backgroundColor: 'rgba(0,0,0,0.8)', alignItems: 'center', justifyContent:'center' }}>
              <MaterialIcons
                name="add-to-photos"
                size={40}
                color="white"
                //onPress={pickImage}
              />
            </View>
          )
        }
        setSelectedImages(images);
    }, []
  )


  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      
      <Swiper>
        <Image
          source={{ uri: props.route.params.images[0] }}
          style={{ width: '100%', height: '100%', shadowOpacity: 0 }}
        />

        <Image
          source={{ uri: props.route.params.images[1] }}
          style={{ width: '100%', height: '100%', shadowOpacity: 0 }}
        />
        
      </Swiper>

      <View style={{ position: "absolute", top: 20, left: 20, shadowOpacity: 1 }}>
        <MaterialIcons name="cancel" size={40} color="white" onPress={test} />
      </View>

      <View style={{ position: "absolute", top: 20, right: 20, shadowOpacity: 1 }}>
        <MaterialIcons name="restore-from-trash" size={40} color="white" />
      </View>

      <View style={{ position: "absolute", bottom: 0, width: '100%', height: '10%', backgroundColor: 'rgba(0,0,0,0.4)', flexDirection: "row" }}>
        {selectedImages}
      </View>


      {/* <View style={{ position: "absolute", bottom: 20, left: 20 }}>
        <MaterialIcons
          name="add-box"
          size={30}
          color="black"
          onPress={openCamera}
        />
      </View> */}

    </View>
  );
}

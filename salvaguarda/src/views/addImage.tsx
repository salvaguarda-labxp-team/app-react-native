import React, { useState } from 'react';
import { Image, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

export default function ImagePickerExample(props) :JSX.Element {
  const [ , setImage] = useState(null);

  const openCamera = async () :Promise<void> => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      setImage(result.uri);
      
    }
  }

  const save = async () :Promise<void> => {
    Alert.alert("Imagem adicionada!");
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {props.route.params.image && <Image source={{ uri: props.route.params.image }} style={{ width: 100, height: 100 }} />}
      
      <View style={{position: "absolute", bottom: 20, left:20}}>
        <MaterialIcons 
          name="add-box" 
          size={30} 
          color="black"
          onPress={openCamera} 
        />
      </View>

      <View style={{position: "absolute", bottom: 20, right:20}}>
        <MaterialIcons 
          name="send" 
          size={24} 
          color="black"
        />
      </View>
    </View>
  );
}

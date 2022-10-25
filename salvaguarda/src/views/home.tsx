import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChoosePic from "../components/choosePic"


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
})

export default function Home(props) :JSX.Element {
  
  return(
    <View style={styles.container}>
      <ChoosePic {...props} />
    </View>
  );
}

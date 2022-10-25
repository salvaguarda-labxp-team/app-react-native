import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { ForgotPasswordScreenProps } from '../definitions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
})

export default function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenProps) :JSX.Element {

  return (
    <View style={styles.container}>
      <Text> WIP </Text>
      <Button onPress={() => navigation.replace('Login')} title={"Voltar para login"} />
    </View>
  );
}

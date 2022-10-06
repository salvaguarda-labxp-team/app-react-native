import React from 'react';
import { Alert, Button, Text, View, TextInput, StyleSheet } from 'react-native';
import { useForm, Controller } from "react-hook-form";


const LoginScreen = () => {

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: ''
    }
  });

  const onSubmit = data => console.log(data);

  return (
    <View>
    <Controller
        control={control}
        rules={{
        required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
        />
        )}
        name="firstName"
    />
    {errors.firstName && <Text>This is required.</Text>}

    <Controller
        control={control}
        rules={{
        maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
        />
        )}
        name="lastName"
    />

    <Button title="Submit" onPress={handleSubmit(onSubmit)} />
  </View>
)};

export default LoginScreen;

const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#0e101c',
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'none',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});

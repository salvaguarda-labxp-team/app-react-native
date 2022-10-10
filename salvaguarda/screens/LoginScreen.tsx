import React from 'react';
import { Alert, Text, View, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useForm, Controller } from "react-hook-form";

type LoginFormData = {
  username: string;
  password: string;
}

type FormItemProps = {
  label: string;
  name: string;
  control: any;
  errors: any;
}

export const FormItem: React.FC<FormItemProps> = ({ name, label, control, errors }) => {
  return <View style={styles.formItem} >
    <Text>{label}</Text>
    {<Controller
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
      name={name}
    />}
    {errors[name] && <Text>This is required.</Text>}
  </View>
}

const LoginScreen: React.FC<{}> = (props) => {

  const { control, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<LoginFormData>({
    mode: 'all',
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const onSubmit = (data: LoginFormData) => { console.log(data.username + ": " + data.password) }

  return (
    <View style={styles.form}>
      <FormItem
        control={control}
        label={"Username"}
        name={"username"}
        errors={errors}
      />
      <FormItem
        control={control}
        label={"Senha"}
        name={"password"}
        errors={errors}
      />
      <View style={styles.actionsMenu}>

        <Button title="Enviar" disabled={!isDirty || !isValid} onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  )
};

export default LoginScreen;

const formWidth = 300;

const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  form: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 8,
    borderColor: 'black',
    width: formWidth,
    height: 600,
  },
  formItem: {
    flexDirection: 'column',
    padding: 0,
    height: 80,
    width: formWidth
  },
  actionsMenu: {
    width: formWidth,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 4,
    borderWidth: 2,
    borderStyle: "solid",
    height: 40,
    padding: 10,
  },
});

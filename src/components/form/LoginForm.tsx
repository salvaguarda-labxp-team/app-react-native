import React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { Controller, Control } from "react-hook-form";
import { RootStackParamsList } from "../../definitions";

export interface LoginFormData {
  username: string;
  password: string;
}

export interface FormItemProps {
  label: string;
  name: "username" | "password";
  control: Control<LoginFormData>;
  secureTextEntry?: boolean;
  errors: any;
  rules: any;
}

export interface LoginFormProps {
  control: Control<LoginFormData>;
  errors: any;
  isDirty: boolean;
  isValid: boolean;
  onSubmit: any;
  rules: any;
  redirectTo: (e: keyof RootStackParamsList) => void;
}

export const FormItem: React.FC<FormItemProps> = ({
  name,
  label,
  control,
  errors,
  rules,
  secureTextEntry,
}) => {
  return (
    <View style={styles.formItem}>
      <Text>{label}</Text>
      {
        <Controller
          control={control}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secureTextEntry}
            />
          )}
          name={name}
        />
      }
      {errors[name] && <Text>{errors[name].message}</Text>}
    </View>
  );
};

export const RedirectToForgotPasswordLink: React.FC<{
  redirectToForgotPassword: () => void;
}> = ({ redirectToForgotPassword }) => {
  return (
    <TouchableOpacity
      style={styles.redirectButton}
      onPress={redirectToForgotPassword}
    >
      <Text>Esqueci minha senha</Text>
    </TouchableOpacity>
  );
};

export const LoginForm: React.FC<LoginFormProps> = ({
  control,
  errors,
  isDirty,
  isValid,
  onSubmit,
  rules,
  redirectTo,
}) => {
  return (
    <View style={styles.form}>
      <FormItem
        control={control}
        label={"Username"}
        name={"username"}
        errors={errors}
        rules={rules.username}
      />
      <FormItem
        control={control}
        label={"Senha"}
        name={"password"}
        secureTextEntry={true}
        errors={errors}
        rules={rules.password}
      />
      <View style={styles.actionsMenu}>
        <RedirectToForgotPasswordLink
          redirectToForgotPassword={() => redirectTo("ForgotPassword")}
        />
        <Button
          title="Enviar"
          disabled={!isDirty || !isValid}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "white",
    margin: 20,
    marginBottom: 5,
    marginLeft: 0,
  },
  redirectButton: {
    alignItems: "center",
    padding: 10,
    marginRight: 20,
  },
  form: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 8,
    borderColor: "black",
    height: 600,
  },
  formItem: {
    flexDirection: "column",
    padding: 0,
    marginBottom: 10,
    height: 80,
  },
  actionsMenu: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  input: {
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 4,
    borderWidth: 2,
    borderStyle: "solid",
    height: 40,
    padding: 10,
  },
});

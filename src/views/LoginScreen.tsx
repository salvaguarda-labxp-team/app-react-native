import { FirebaseError } from "firebase/app";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { LoginForm, LoginFormData } from "../components/form/LoginForm";
import { LoginScreenProps } from "../definitions/ScreenPropsTypes.js";
import { AuthenticationAPI } from "../lib/services";
import { FirebaseUsersAPI } from "../lib/services/FirebaseUsersAPI";
import { auth } from "../lib/utils/firebase";
import { LocalStorageProvider } from "../lib/utils/storage";

const LoginPage = ({ navigation }: LoginScreenProps): JSX.Element => {
  // TODO: pass object as parameter to LoginPage so that it can be mocked in tests
  const storage = new LocalStorageProvider();

  const fetchAndSaveUser = async (userAuthId: string): Promise<void> => {
    const user = await FirebaseUsersAPI.getUserByAuthId(userAuthId);

    await storage.set("user", user);
  };

  const clearUser = async (): Promise<void> => {
    await storage.remove("user");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (loggedUser) => {
      const handleAuthStateChange = async (): Promise<void> => {
        if (loggedUser != null) {
          // User logged in
          navigation.replace("Menu");
          await fetchAndSaveUser(loggedUser.uid);
        } else {
          // User logged out
          navigation.canGoBack() && navigation.popToTop();
          await clearUser();
        }
      };

      const handleError = (): void => {
        alert("Erro ao fazer login. Por favor, tente novamente mais tarde.");
        navigation.canGoBack() && navigation.popToTop();
      };

      handleAuthStateChange().catch(handleError);
    });
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<LoginFormData>({
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async ({ username, password }: LoginFormData) => {
      try {
        await AuthenticationAPI.login(username, password);
      } catch (error: any) {
        if ((error as FirebaseError)?.code === "auth/network-request-failed") {
          alert("Erro de conexão. Por favor, tente novamente mais tarde.");
        }
        if ((error as FirebaseError)?.code) {
          alert(
            "Username ou senha inválidos. Por favor, confira os campos inseridos e tente novamente."
          );
        }
      }
    },
    []
  );

  const formOnSubmit = useMemo(() => {
    return handleSubmit(onSubmit);
  }, [onSubmit, handleSubmit]);

  const rules = useMemo(() => {
    return {
      username: {
        required: "Campo deve ser preenchido",
        minLength: {
          value: 3,
          message: "Username deve possuir no mínimo 3 caracteres",
        },
      },
      password: {
        required: "Campo deve ser preenchido",
        minLength: {
          value: 6,
          message: "Senha deve possuir no mínimo 6 caracteres",
        },
      },
    };
  }, []);
  return (
    <LoginForm
      {...{
        control,
        errors,
        isDirty,
        isValid,
        rules,
        onSubmit: formOnSubmit,
        redirectTo: navigation.replace,
      }}
    />
  );
};

export default LoginPage;

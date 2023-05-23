import { useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = () => {
  const [avatar, setAvatar] = useState(null);
  const [state, setstate] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);

  const addImg = () => {};
  const delImg = () => {
    setAvatar(null);
  };

  const toggleShowPassword = () => {
    setShowPassword((pS) => !pS);
  };

  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
    setIsShowKeyboard(true);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    keyboardHide();
    console.log(state);
    setstate(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground style={styles.bg} source={require("../assets/bg.jpg")}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : null}
        >
          <Pressable
            style={{
              ...styles.formContainer,
              paddingBottom: isShowKeyboard ? 32 : 66,
            }}
            onPress={keyboardHide}
          >
            <View style={styles.avatarBox}>
              <Image source={{ uri: avatar }} style={styles.avatarImg} />
              {avatar ? (
                <TouchableOpacity onPress={delImg} style={styles.avatarIcon}>
                  <AntDesign name="close" size={16} color="#BDBDBD" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={delImg} style={styles.avatarIcon}>
                  <AntDesign name="plus" size={16} color="#BDBDBD" />
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.text}>Регистрация</Text>
            <TextInput
              style={{
                ...styles.input,
                borderColor: focusedInput === "input1" ? "#FF6C00" : "#E8E8E8",
              }}
              textAlign={"left"}
              placeholder="Логин"
              value={state.login}
              onFocus={() => handleFocus("input1")}
              onChangeText={(value) =>
                setstate((prevState) => ({ ...prevState, login: value }))
              }
            />
            <TextInput
              style={{
                ...styles.input,
                borderColor: focusedInput === "input2" ? "#FF6C00" : "#E8E8E8",
              }}
              textAlign={"left"}
              placeholder="Адрес электронной почты"
              value={state.email}
              onFocus={() => handleFocus("input2")}
              onChangeText={(value) =>
                setstate((prevState) => ({ ...prevState, email: value }))
              }
            />
            <View style={{ position: "relative", minWidth: "91.6%" }}>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor:
                    focusedInput === "input3" ? "#FF6C00" : "#E8E8E8",
                }}
                textAlign={"left"}
                placeholder="Пароль"
                secureTextEntry={showPassword}
                value={state.password}
                onFocus={() => handleFocus("input3")}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, password: value }))
                }
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 32, bottom: 16 }}
                onPress={toggleShowPassword}
              >
                <Text style={styles.btnPasswordText}>
                  {showPassword ? "Показати" : "Приховати"}
                </Text>
              </TouchableOpacity>
            </View>
            {!isShowKeyboard ? (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btn}
                  onPress={handleSubmit}
                >
                  <Text style={styles.btnTitle}>Зарегистрироваться</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.navButton}>
                  <Text style={styles.navButtonTitle}>
                    Уже есть аккаунт? Войти
                  </Text>
                </TouchableOpacity>
              </>
            ) : null}
          </Pressable>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formContainer: {
    position: "relative",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  avatarBox: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarIcon: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    justifyContent: "center",

    alignItems: "center",
    width: 25,
    height: 25,
    borderRadius: 1000,
    overflow: "hidden",
    position: "absolute",
    bottom: 14,
    right: -12.5,
  },
  text: {
    textAlign: "center",
    marginBottom: 16,
    marginTop: 92,
    marginHorizontal: 16,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
  },

  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    minWidth: "90%",
    marginHorizontal: 16,
    borderRadius: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
  },
  btnPasswordText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 26,
    padding: 16,
    minWidth: "90%",
    borderRadius: 100,
    marginHorizontal: 16,
    backgroundColor: "#FF6C00",
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#FFFFFF",
  },
  navButton: {
    marginHorizontal: 16,
  },
  navButtonTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
  },
});

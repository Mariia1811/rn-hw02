import { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = () => {
  const [state, setstate] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

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

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground style={styles.bg} source={require("../assets/bg.jpg")}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : null}
        >
          <Pressable
            style={{
              ...styles.formContainer,
              paddingBottom: isShowKeyboard ? 32 : 132,
            }}
            onPress={keyboardHide}
          >
            <Text style={styles.text}>Войти</Text>
            <TextInput
              style={{
                ...styles.input,
                borderColor: focusedInput === "input1" ? "#FF6C00" : "#E8E8E8",
              }}
              textAlign={"left"}
              placeholder="Адрес электронной почты"
              value={state.email}
              onFocus={() => handleFocus("input1")}
              onChangeText={(value) =>
                setstate((prevState) => ({ ...prevState, email: value }))
              }
            />
            <View style={{ position: "relative" }}>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor:
                    focusedInput === "input2" ? "#FF6C00" : "#E8E8E8",
                }}
                textAlign={"left"}
                placeholder="Пароль"
                secureTextEntry={showPassword}
                value={state.password}
                onFocus={() => handleFocus("input2")}
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
                <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
                  <Text style={styles.btnTitle}>Войти</Text>
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

export default LoginScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formContainer: {
    gap: 16,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  text: {
    marginBottom: 16,
    marginTop: 32,
    marginHorizontal: 16,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
  },
  input: {
    padding: 15,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
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
    borderRadius: 100,
    marginHorizontal: 16,
    backgroundColor: "#FF6C00",
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#FFFFFF",
  },
  navButtonTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
  },
});

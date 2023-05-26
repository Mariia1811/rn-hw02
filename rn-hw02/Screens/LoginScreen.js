import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
import { loginThunk } from "../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = ({ navigation }) => {
  const [state, setstate] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);

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
    dispatch(loginThunk(state));
    setstate(initialState);
    navigation.navigate("Home");
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
            <Text style={styles.text}>Увійти</Text>
            <TextInput
              style={{
                ...styles.input,
                borderColor: focusedInput === "input1" ? "#FF6C00" : "#E8E8E8",
              }}
              textAlign={"left"}
              placeholder="Адреса електронної пошти"
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
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btn}
                  onPress={handleSubmit}
                >
                  <Text style={styles.btnTitle}>Увійти</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.navButton}>
                  <Text style={styles.navButtonTitle}>
                    Ще нема акаунту?
                    <Text
                      onPress={() => navigation.navigate("RegistrationScreen")}
                    >
                      Зареєструватися
                    </Text>
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

import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useFonts } from "expo-font";

import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import Home from "./Screens/Home";
import MapScreen from "./Screens/MapScreen";
import CommentsScreen from "./Screens/CommentsScreen";

import { AntDesign } from "@expo/vector-icons";

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="LoginScreen">
            <MainStack.Screen
              name="RegistrationScreen"
              component={RegistrationScreen}
              options={{
                headerShown: false,
              }}
            />
            <MainStack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <MainStack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <MainStack.Screen
              name="CommentsScreen"
              component={CommentsScreen}
              options={({ navigation }) => ({
                title: "Коментарі",
                headerLeft: () => (
                  <AntDesign
                    name="arrowleft"
                    size={24}
                    color="rgba(33, 33, 33, 0.8)"
                    style={{ paddingLeft: 20 }}
                    onPress={() => navigation.navigate("Home")}
                  />
                ),
              })}
            />
            <MainStack.Screen
              name="MapScreen"
              component={MapScreen}
              options={({ navigation }) => ({
                title: "Карта",
                headerLeft: () => (
                  <AntDesign
                    name="arrowleft"
                    size={24}
                    color="rgba(33, 33, 33, 0.8)"
                    style={{ paddingLeft: 20 }}
                    onPress={() => navigation.navigate("Home")}
                  />
                ),
              })}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

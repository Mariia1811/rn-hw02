import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useState } from "react";
import { useSelector } from "react-redux";

import { onAuthStateChanged } from "firebase/auth";

import LoginScreen from "./LoginScreen";
import RegistrationScreen from "./RegistrationScreen";
import Home from "./Home";
import MapScreen from "./MapScreen";
import CommentsScreen from "./CommentsScreen";

import { AntDesign } from "@expo/vector-icons";

const MainStack = createStackNavigator();

function MainRoute() {
  const [user, setUser] = useState(null);

  // const state = useSelector((state) => state);
  // console.log("state", state);

  const authStateChanged = async (onChange = () => {}) => {
    onAuthStateChanged((user) => {
      onChange(user);
    });
  };
  console.log("new", authStateChanged);
  return (
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
  );
}

export default MainRoute;

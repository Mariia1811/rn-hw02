import "react-native-gesture-handler";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { authStateCahngeUseThunk } from "../redux/auth/authOperations";

import LoginScreen from "./LoginScreen";
import RegistrationScreen from "./RegistrationScreen";
import Home from "./Home";
import MapScreen from "./MapScreen";
import CommentsScreen from "./CommentsScreen";

import { AntDesign } from "@expo/vector-icons";

const MainStack = createStackNavigator();

function MainRoute() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth.isUser);

  useEffect(() => {
    dispatch(authStateCahngeUseThunk());
  }, [state]);

  return (
    <NavigationContainer>
      {!state ? (
        <MainStack.Navigator>
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
        </MainStack.Navigator>
      ) : (
        <MainStack.Navigator>
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
      )}
    </NavigationContainer>
  );
}

export default MainRoute;

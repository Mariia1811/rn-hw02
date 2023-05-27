import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import Home from "./Screens/Home";
import MapScreen from "./Screens/MapScreen";
import CommentsScreen from "./Screens/CommentsScreen";

import { AntDesign } from "@expo/vector-icons";

const MainStack = createStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
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
    );
  }
  return (
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
  );
};

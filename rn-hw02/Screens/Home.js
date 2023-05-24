import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "../Screens/PostsScreen";
import CreatePostsScreen from "../Screens/CreatePostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";

import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

function Home() {
  const route = useRoute();
  console.log(route);
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#FFFFFF",
          borderBottomColor: "0px 0.6px 0px rgba(0, 0, 0, 0.3)",
          borderBottomWidth: 0.3,
        },
        headerTintColor: "#212121",
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          fontWeight: 500,
          fontSize: 17,
        },
        tabBarShowLabel: false,
        tabBarOptions: {
          style: {
            justifyContent: "center",
            alignItems: "center",
          },
        },
      }}
    >
      <Tab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: "Публікації",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  width: 70,
                  height: 40,
                  backgroundColor: "#FF6C00",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                }}
              >
                <Ionicons name="grid-outline" size={24} color="#FFFFFF" />
              </View>
            ) : (
              <Ionicons
                name="grid-outline"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            ),
          headerRight: () => (
            <MaterialIcons
              name="logout"
              size={24}
              color="#BDBDBD"
              style={{ paddingRight: 20 }}
              onPress={() => navigation.navigate("LoginScreen")}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  width: 70,
                  height: 40,
                  backgroundColor: "#FF6C00",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                }}
              >
                <AntDesign name="plus" size={24} color="#FFFFFF" />
              </View>
            ) : (
              <Octicons name="plus" size={24} color="rgba(33, 33, 33, 0.8)" />
            ),
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="rgba(33, 33, 33, 0.8)"
              style={{ paddingLeft: 20 }}
              onPress={() => navigation.navigate("PostsScreen")}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View
                style={{
                  width: 70,
                  height: 40,
                  backgroundColor: "#FF6C00",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                }}
              >
                <Feather name="user" size={24} color="#FFFFFF" />
              </View>
            ) : (
              <Feather name="user" size={24} color="rgba(33, 33, 33, 0.8)" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Home;

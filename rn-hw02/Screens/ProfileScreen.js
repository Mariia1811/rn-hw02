import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config.js";

import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

function ProfileScreen({ navigation }) {
  const [avatar, setAvatar] = useState(null);
  const [posts, setPosts] = useState([]);
  const { login, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    await onSnapshot(
      query(collection(db, "myPosts"), where("userId", "==", userId)),
      (data) => {
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );
  };

  const addImg = () => {};
  const delImg = () => {
    setAvatar(null);
  };

  return (
    <ImageBackground style={styles.bg} source={require("../assets/bg.jpg")}>
      <View style={styles.postContainer}>
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
        <Text style={styles.text}>{login}</Text>
        <View>
          <FlatList
            style={styles.listItem}
            data={posts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image source={{ uri: item.photo }} style={styles.itemImg} />
                <View style={styles.itemOverlay}>
                  <Text style={styles.itemTitle}>{item.data.name}</Text>
                  <View style={styles.itemInfo}>
                    <TouchableOpacity
                      style={styles.overlayIcons}
                      onPress={() =>
                        navigation.navigate("CommentsScreen", item)
                      }
                    >
                      <FontAwesome name="comment-o" size={24} color="#BDBDBD" />
                      <Text style={styles.itemCount}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.overlayIcons}
                      onPress={() => navigation.navigate("MapScreen", item)}
                    >
                      <Ionicons
                        name="md-location-outline"
                        size={24}
                        color="#BDBDBD"
                      />
                      <Text style={styles.itemPlace}>
                        {item.data.locationTitle}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "flex-end",
  },
  postContainer: {
    position: "relative",
    paddingBottom: 150,
    paddingHorizontal: 16,
    minHeight: "70%",
    maxHeight: "85%",
    gap: 16,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  avatarBox: {
    position: "absolute",
    top: -60,
    right: "40%",
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
  item: {
    marginBottom: 32,
    justifyContent: "center",
  },
  itemImg: {
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  itemTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
  },
  overlayIcons: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  itemInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemCount: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  itemPlace: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
});

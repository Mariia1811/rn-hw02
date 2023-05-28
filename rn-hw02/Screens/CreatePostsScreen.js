import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { storage, db } from "../firebase/config.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const initialState = {
  name: "",
  locationTitle: "",
};

function CreatePostsScreen({ navigation }) {
  const [data, setData] = useState(initialState);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);

  const { login, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsCameraOpen(true);
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);

    if (Platform.OS !== "web") {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Sorry, we need location permissions to make this work!", [
          { text: "Okay" },
        ]);
        return;
      }
    }

    let point = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: point.coords.latitude,
      longitude: point.coords.longitude,
    };
    setLocation(coords);
  };

  const openCamera = () => {
    setIsCameraOpen((pS) => !pS);
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const docRef = await addDoc(collection(db, "myPosts"), {
      photo,
      data,
      location,
      userId,
      login,
    });
    // await setDoc(doc(db, "myPosts", "MK"), {
    //   photo,
    //   data,
    //   location,
    //   userId,
    //   login,
    // });
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    const postsRef = ref(storage, `postImage/${uniquePostId}`);
    const metadata = {
      contentType: "image/jpg",
    };

    await uploadBytes(postsRef, file, metadata);
    const processedPhoto = await getDownloadURL(
      ref(storage, `postImage/${uniquePostId}`)
    );

    return processedPhoto;
  };

  const handleSubmit = async () => {
    navigation.navigate("PostsScreen");
    await uploadPostToServer();
    handleDelete();
  };

  const handleDelete = () => {
    setData(initialState);
    setIsCameraOpen(false);
    setPhoto(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          {!isCameraOpen ? (
            <View style={styles.wrapGray}>
              <TouchableOpacity
                onPress={openCamera}
                style={styles.btnContainer}
              >
                <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.wrapCamera}>
              <Camera style={styles.camera} ref={setCamera}>
                {photo ? (
                  <View>
                    <Image source={{ uri: photo }} style={{ height: 240 }} />
                  </View>
                ) : null}

                <TouchableOpacity
                  onPress={takePhoto}
                  style={styles.btnContainer}
                >
                  <MaterialIcons
                    name="photo-camera"
                    size={24}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </Camera>
            </View>
          )}
          <TextInput
            style={styles.input}
            textAlign={"left"}
            placeholder="Назва..."
            value={data.name}
            onFocus={() => {}}
            onChangeText={(value) =>
              setData((prevState) => ({ ...prevState, name: value }))
            }
          />
          <View style={{ position: "relative" }}>
            <Ionicons
              name="md-location-outline"
              style={{ position: "absolute", left: 0, bottom: 16 }}
              size={18}
              color="#BDBDBD"
            />
            <TextInput
              style={{ ...styles.input, paddingLeft: 25, marginTop: 16 }}
              textAlign={"left"}
              placeholder="Місцевість..."
              value={data.locationTitle}
              onFocus={() => {}}
              onChangeText={(value) =>
                setData((prevState) => ({ ...prevState, locationTitle: value }))
              }
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={
              photo
                ? { ...styles.btn }
                : {
                    ...styles.btn,
                    backgroundColor: "#F6F6F6",
                    color: "#BDBDBD",
                  }
            }
            onPress={handleSubmit}
          >
            <Text style={styles.btnTitle}>Опубліковати</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.delateBtn} onPress={handleDelete}>
        <AntDesign name="delete" size={(24, 14)} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
}

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 22,
  },
  wrapGray: {
    height: 240,
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  wrapCamera: {
    borderRadius: 8,
    overflow: "hidden",
  },
  btnContainer: {
    position: "absolute",
    left: "42%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    zIndex: 100,
  },
  camera: {
    justifyContent: "center",
    height: 240,
  },
  input: {
    marginTop: 48,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    padding: 16,
    minWidth: "100%",
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#FFFFFF",
  },
  delateBtn: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    paddingHorizontal: 23,
    paddingVertical: 8,
    marginTop: 8,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});

import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";

import { db } from "../firebase/config.js";
import { doc, addDoc, collection, onSnapshot } from "firebase/firestore";

import { AntDesign } from "@expo/vector-icons";

function CommentsScreen() {
  const [comment, setComment] = useState();
  const [allComments, setAllComments] = useState([]);
  const { params } = useRoute();
  const postId = params.id;

  useEffect(() => {
    getAllPosts();
  }, []);

  const newPostRef = doc(db, "myPosts", postId);
  const commentRef = collection(newPostRef, "comments");

  const createPost = async () => {
    await addDoc(commentRef, {
      comment,
    });
  };

  const getAllPosts = async () => {
    onSnapshot(commentRef, (data) => {
      setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: params.photo }} style={styles.itemImg} />
        <View style={styles.commentContainer}>
          <FlatList
            data={allComments}
            renderItem={(i) => (
              <View style={styles.commentWrap}>
                <Image
                  source={require("../assets/ava.png")}
                  style={styles.ava}
                />
                <View style={styles.commentTextWrap}>
                  <Text style={styles.comment}>{comment}</Text>
                  <Text style={styles.commentDate}>date</Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      <View style={{ position: "relative" }}>
        <TextInput
          style={styles.input}
          textAlign={"left"}
          placeholder="Коментувати..."
          value={comment}
          onFocus={() => {}}
          onChangeText={setComment}
        />
        <TouchableOpacity onPress={createPost} style={styles.btnSentWrap}>
          <AntDesign name="arrowup" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 16,
  },
  itemImg: {
    height: 240,
    borderRadius: 8,
  },
  commentContainer: { paddingVertical: 32 },
  commentWrap: {
    justifyContent: "space-between",
    marginBottom: 24,
    flexDirection: "row",
  },
  ava: {
    width: 28,
    height: 28,
    overflow: "hidden",
    borderRadius: 100,
  },
  commentTextWrap: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    borderTopLeftRadius: 0,
    padding: 16,
  },
  comment: {
    width: 300,
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: "#212121",
  },
  commentDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    textAlign: "right",
    color: "#BDBDBD",
  },
  input: {
    padding: 14,
    height: 50,
    fontSize: 16,
    fontFamily: "Inter-Medium",
    borderRadius: 100,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  btnSentWrap: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});

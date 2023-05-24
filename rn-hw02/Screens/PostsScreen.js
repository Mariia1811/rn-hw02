import { Image } from "react-native";
import { StyleSheet, Text, View } from "react-native";

function PostsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.containerUser}>
        <Image
          style={styles.avatarUser}
          source={require("../assets/ava.png")}
        />
        <View>
          <Text style={styles.nameUser}>Natali Romanova</Text>
          <Text>email@example.com</Text>
        </View>
      </View>
    </View>
  );
}

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  containerUser: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginBottom: 32,
  },
  avatarUser: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  nameUser: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    color: "#212121",
  },
});

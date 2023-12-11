import { useState } from "react";
import { API_URL, YOUTUBE_TOKEN } from "@env";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Home({ navigation }) {
  const [keyword, setKeyword] = useState("");

  const youtube_url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${keyword}&key=${YOUTUBE_TOKEN}&fields=items(id,snippet)`;
  async function requestVideos() {
    try {
      const res = await fetch(youtube_url);
      const json = await res.json();
      navigation.navigate("Videos", { data: json.items });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>NOTUBE'S CHILD</Text>
      <View style={styles.textWrapper}>
        <TextInput
          value={keyword}
          style={keyword === "" ? styles.inputSmaller : styles.input}
          onChangeText={(text) => setKeyword(text)}
          placeholder="Escribe una palabra para empezar a buscar"
        />
        <View style={styles.submit}>
          <Button title="Buscar" onPress={() => requestVideos()} />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    border: "2px solid red",
    alignItems: "center",
    width: "100%",
  },
  header: {
    backgroundColor: "#333",
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    padding: 10,
    paddingTop: 32,
    width: "100%",
    textAlign: "center",
  },
  textWrapper: {
    borderColor: "red",
    borderStyle: "solid",
    minHeight: "auto",
  },
  input: {
    marginTop: 30,
    padding: 10,
    maxWidth: 300,
    borderColor: "#ddd",
    borderBottomWidth: 2,
  },
  inputSmaller: {
    fontSize: 10,
    marginTop: 30,
    padding: 10,
    maxWidth: 300,
    borderColor: "#ddd",
    borderBottomWidth: 2,
  },
  submit: {
    marginTop: 30,
  },
});

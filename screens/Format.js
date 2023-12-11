import { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import RadioBtn from "../components/RadioBtn";
import { API_URL } from "@env";
import downloadFileAndSaveToDevice from "../utils/fileSave";

export default function FormatScreen({ route }) {
  const [format, setFormat] = useState("audio");

  const videoData = route.params.data;
  const { title, channelTitle, thumbnails } = videoData.snippet;
  const img = thumbnails.high.url;

  const DOWNLOAD_URL = `${API_URL}/${format}/${videoData.id.videoId}`;
  const fileExt = format === "audio" ? "mp3" : "mp4";
  async function handlePress() {
    await downloadFileAndSaveToDevice(DOWNLOAD_URL, title, fileExt);
  }
  return (
    <View>
      <View style={styles.bar} />
      <Image src={img} style={styles.img} />
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.channel}>{channelTitle}</Text>
      <View>
        <RadioBtn handleChange={setFormat} value={format} />
        <View>
          <Button onPress={handlePress} title="Descargar" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: "black",
    width: "100%",
    height: 15,
  },
  img: {
    width: "100%",
    height: 180,
    position: "relative",
  },
  text: {
    fontSize: 15,
    fontWeight: "800",
    maxHeight: 80,
  },
  channel: {
    fontSize: 13,
    color: "gray",
  },
});

/* 
  const saveFile = async (uri) => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          "video.mp4",
          mimetype
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) => console.log(e));
      }
    } else {
      Sharing.shareAsync(uri);
    }
  };
 */

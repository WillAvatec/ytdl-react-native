import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { decode } from "html-entities";

export default function Videos({ route, navigation }) {
  const videos = route.params.data;

  function goToFormatSelection(snippetData) {
    navigation.navigate("Format", { data: snippetData });
  }

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      {videos.map((vid, id) => {
        const { title, thumbnails, description, channelTitle } = vid.snippet;
        return (
          <TouchableHighlight
            key={id}
            style={styles.videoItem}
            onPress={() => goToFormatSelection(vid)}
          >
            <View style={styles.details}>
              <View style={styles.imgWrapper}>
                <Image
                  src={thumbnails.high.url}
                  alt={description}
                  style={styles.img}
                />
              </View>
              <View style={styles.textWrapper}>
                <Text
                  style={styles.text}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {decode(title)}
                </Text>
                <Text style={styles.channel}>{decode(channelTitle)}</Text>
              </View>
            </View>
          </TouchableHighlight>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 180,
    position: "relative",
  },
  imgWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    flex: 1,
    width: "100%",
  },
  wrapper: {
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 35,
  },
  videoItem: {
    position: "relative",
    marginBottom: 50,
    zIndex: 10,
  },
  textWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: "800",
    maxHeight: 80,
  },
  channel: {
    fontSize: 10,
    color: "gray",
  },
});

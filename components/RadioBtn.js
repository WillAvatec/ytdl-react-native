import { StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";

const RadioBtn = ({ handleChange, value }) => {
  return (
    <>
      <Text>Elije un formato:</Text>

      <RadioButton.Group
        onValueChange={(val) => handleChange(val)}
        value={value}
      >
        <View style={styles.group}>
          <RadioButton value="audio" />
          <Text>Audio</Text>
        </View>
        <View style={styles.group}>
          <RadioButton value="video" />
          <Text>Video</Text>
        </View>
      </RadioButton.Group>

      <Text>{value}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default RadioBtn;

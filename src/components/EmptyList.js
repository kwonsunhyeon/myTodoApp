import { Image, StyleSheet, Text, View } from "react-native";
import { PRIMARY } from "../Color";

const EmptyList = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/main.png")} />
      <Text style={styles.title}>할 일을 추가해 주세요.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: PRIMARY.DARK,
  },
});

export default EmptyList;

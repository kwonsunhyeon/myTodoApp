import { StyleSheet, View } from "react-native";
import { WHITE } from "./src/Color";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./src/navigations/AuthStack";

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <AuthStack />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default App;

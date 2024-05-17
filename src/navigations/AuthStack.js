import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import ListScreen from "../screens/ListScreen";
import { PRIMARY, WHITE } from "../Color";
import { Pressable, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        contentStyle: { backgroundColor: WHITE },
        headerTitleAlign: "center",
        headerTintColor: PRIMARY.DEFAULT,
        headerTitleStyle: { fontWeight: "700" },
        headerLeft: ({ canGoBack, tintColor }) => {
          const navigation = useNavigation();
          if (!canGoBack) {
            return null;
          }
          return (
            <Pressable onPress={navigation.goBack}>
              <MaterialIcons name="chevron-left" size={30} color={tintColor} />
            </Pressable>
          );
        },
        // headerTitle: ({ children, tintColor }) => {
        //   return (
        //     <Pressable>
        //       <Text style={{ color: tintColor }}>{children}</Text>
        //     </Pressable>
        //   );
        // },
      }}
    >
      <Stack.Screen
        name="Home"
        component={SignInScreen}
        options={{ title: "로그인" }}
      />
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{
          title: "TODO LIST",
          headerTintColor: PRIMARY.DEFAULT,
          headerTitleStyle: {
            fontWeight: "700",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

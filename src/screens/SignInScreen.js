import { Alert, Image, Keyboard, StyleSheet, View } from "react-native";
import Button from "../components/Button";
import Input, {
  IconNames,
  KeyboardTypes,
  ReturnKeyTypes,
} from "../components/Input";
import SafeInputView from "../components/SafeInputView";
import { useEffect, useRef, useState } from "react";
import SignIn from "../components/SignIn";
import PropTypes from "prop-types";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDisabled(!email || !password);
  }, [email, password]);

  const onSubmit = async () => {
    if (!isLoading && !disabled) {
      try {
        setIsLoading(true);
        Keyboard.dismiss();
        const data = await SignIn(email, password);
        setIsLoading(false);
        navigation.navigate("List");
      } catch (error) {
        Alert.alert("로그인 실패", error, [
          {
            text: "확인",
            style: "default",
            onPress: () => setIsLoading(false),
          },
        ]);
      }
      setIsLoading(false);
    }
  };

  return (
    <SafeInputView>
      <View style={styles.container}>
        <Image source={require("../assets/main.png")} />
        <Input
          title="이메일"
          value={email}
          onChangeText={(email) => setEmail(email.trim())}
          iconName={IconNames.EMAIL}
          returnKeyType={ReturnKeyTypes.NEXT}
          keyboardType={KeyboardTypes.EMAIL}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <Input
          ref={passwordRef}
          title="비밀번호"
          value={password}
          onChangeText={(password) => setPassword(password.trim())}
          iconName={IconNames.PASSWORD}
          returnKeyType={ReturnKeyTypes.DONE}
          secureTextEntry
          onSubmitEditing={onSubmit}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="로그인"
            onPress={onSubmit}
            disabled={disabled}
            isLoading={isLoading}
          />
        </View>
      </View>
    </SafeInputView>
  );
};
SignInScreen.proptypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default SignInScreen;

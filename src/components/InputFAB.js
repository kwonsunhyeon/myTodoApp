import {
  Animated,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GRAY, PRIMARY, WHITE } from "../Color";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const BOTTOM = 30;
const BUTTON_WIDTH = 60;

const InputFAB = ({ onInsert }) => {
  const [text, setText] = useState("");
  const [isOpened, setIsOpened] = useState(false);
  const inputRef = useRef();
  const windowWidth = useWindowDimensions().width;
  const [keyboardHeight, setKeyboardHeight] = useState(BOTTOM);
  const inputWidth = useRef(new Animated.Value(BUTTON_WIDTH)).current;
  const buttonRotation = useRef(new Animated.Value(0)).current;

  const open = () => {
    setIsOpened(true);
    Animated.timing(inputWidth, {
      toValue: windowWidth - 20,
      useNativeDriver: false,
      duration: 700,
    }).start(() => {
      inputRef.current.focus();
    });
    Animated.spring(buttonRotation, {
      toValue: 1,
      useNativeDriver: false,
      bounciness: 20,
    }).start();
  };

  const close = () => {
    if (isOpened) {
      setText("");
      setIsOpened(false);
      Animated.timing(inputWidth, {
        toValue: BUTTON_WIDTH,
        useNativeDriver: false,
        duration: 700,
      }).start(() => {
        inputRef.current.blur();
      });
      Animated.spring(buttonRotation, {
        toValue: 0,
        useNativeDriver: false,
        bounciness: 20,
      }).start();
    }
  };

  const spin = buttonRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "315deg"],
  });

  const onPressButton = () => {
    isOpened ? close() : open();
  };

  useEffect(() => {
    if (Platform.OS === "ios") {
      Keyboard.addListener("keyboardWillShow", (e) => {
        setKeyboardHeight(e.endCoordinates.height + BOTTOM);
      });
      Keyboard.addListener("keyboardWillHide", () => {
        setKeyboardHeight(BOTTOM);
      });
    }
  }, []);

  const onPressInsert = () => {
    const task = text.trim();
    if (task) {
      onInsert(task);
    }
  };

  return (
    <>
      <Animated.View
        style={[
          styles.position,
          styles.shape,
          styles.shadow,
          {
            justifyContent: "center",
            bottom: keyboardHeight,
            width: inputWidth,
          },
          isOpened && { width: windowWidth - 20 },
        ]}
      >
        <TextInput
          value={text}
          onChangeText={(text) => setText(text)}
          style={[styles.input]}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
          keyboardAppearance="light"
          returnKeyType="done"
          ref={inputRef}
          onBlur={close}
          onSubmitEditing={onPressInsert}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.position,
          styles.shape,
          {
            bottom: keyboardHeight,
            transform: [{ rotate: spin }],
          },
        ]}
      >
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.shape,
            styles.shadow,
            pressed && { backgroundColor: PRIMARY.DARK },
          ]}
          onPress={onPressButton}
        >
          <MaterialCommunityIcons name="plus" size={24} color={WHITE} />
        </Pressable>
      </Animated.View>
    </>
  );
};

InputFAB.proptypes = {
  onInsert: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  position: {
    position: "absolute",
    bottom: BOTTOM,
    right: 10,
  },
  shape: {
    width: BUTTON_WIDTH,
    height: BUTTON_WIDTH,
    borderRadius: BUTTON_WIDTH / 2,
    backgroundColor: PRIMARY.DEFAULT,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    color: WHITE,
    paddingLeft: 20,
    paddingRight: BUTTON_WIDTH + 10,
  },
  shadow: {
    shadowColor: GRAY.DARK,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 3,
      },
      android: { elevation: 5 },
    }),
  },
});

export default InputFAB;

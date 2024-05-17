import { Keyboard, StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { BLACK, GRAY, PRIMARY } from "../Color";
import { forwardRef, useState } from "react";

const KeyboardTypes = {
  DEFAULT: "default",
  EMAIL: "email-address",
  URL: "url",
  TEL: "phone-pad",
};

const ReturnKeyTypes = {
  DONE: "done",
  NEXT: "next",
};

const IconNames = {
  EMAIL: "email",
  PASSWORD: "lock",
};

const Input = forwardRef(
  (
    {
      title,
      iconName,
      placeholderText,
      value,
      keyboardType,
      returnKeyType,
      secureTextEntry,
      ...props // 모든 props를 간소화하는 코드
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.title,
            value && styles.hasValueTitle,
            isFocused && styles.focusedTitle,
          ]}
        >
          {title}
        </Text>
        <View>
          <TextInput
            returnKeyType={returnKeyType}
            keyboardType={keyboardType}
            placeholder={placeholderText ?? title}
            placeholderTextColor={GRAY.DEFAULT}
            ref={ref}
            value={value}
            {...props} // 모든 props를 간소화하는 코드
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="none"
            keyboardAppearance="light"
            secureTextEntry={secureTextEntry}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[
              styles.input,
              isFocused && styles.focusedInput,
              value && styles.hasValueInput,
            ]}
          />
          <View style={styles.icon}>
            <MaterialIcons
              name={iconName}
              size={20}
              color={(() => {
                switch (true) {
                  case isFocused:
                    return PRIMARY.DEFAULT;
                  case !!value:
                    return BLACK;
                  default:
                    return GRAY.DEFAULT;
                }
              })()}
            />
          </View>
        </View>
      </View>
    );
  }
);

Input.displayName = "Input";

Input.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf(Object.values(KeyboardTypes)),
  returnKeyType: PropTypes.oneOf(Object.values(ReturnKeyTypes)),
  iconName: PropTypes.oneOf(Object.values(IconNames)),
  placeholderText: PropTypes.string,
  secureTextEntry: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    color: GRAY.DEFAULT,
    marginBottom: 4,
    fontSize: 15,
  },
  focusedTitle: {
    color: PRIMARY.DEFAULT,
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: GRAY.DEFAULT,
    height: 45,
    paddingVertical: 0,
    paddingHorizontal: 10,
    paddingLeft: 40,
  },
  hasValueTitle: {
    color: BLACK,
  },
  hasValueInput: {
    borderColor: BLACK,
    color: BLACK,
  },
  focusedInput: {
    borderWidth: 2,
    borderColor: PRIMARY.DEFAULT,
    color: PRIMARY.DEFAULT,
  },
  icon: {
    position: "absolute",
    left: 10,
    height: "100%",
    justifyContent: "center",
  },
});

export { IconNames, KeyboardTypes, ReturnKeyTypes };
export default Input;

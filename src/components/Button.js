import {Pressable, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {PRIMARY, WHITE} from '../Color';

const Button = ({title, onPress, disabled}) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        pressed && {backgroundColor: PRIMARY.DARK},
        disabled && {backgroundColor: PRIMARY.LIGHT, opacity: 0.6},
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 25,
    paddingVertical: 15,
    backgroundColor: PRIMARY.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Button;

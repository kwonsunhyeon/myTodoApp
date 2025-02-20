import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BLACK, DANGER, GRAY, PRIMARY } from "../Color";

const ListItem = memo(({ item, onDelete, onToggle }) => {
  const checkboxProps = {
    name: item.isDone ? "checkbox-marked" : "checkbox-blank-outline",
    color: item.isDone ? PRIMARY.DEFAULT : BLACK,
    size: 20,
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onToggle(item.id)}
        hitSlop={10}
        style={styles.isDone}
      >
        <MaterialCommunityIcons {...checkboxProps} />
      </Pressable>

      <View style={styles.task}>
        <Text
          style={
            item.isDone && {
              color: GRAY.DEFAULT,
              textDecorationLine: "line-through",
            }
          }
        >
          {item.task}
        </Text>
      </View>

      <Pressable onPress={() => onDelete(item.id)} hitSlop={10}>
        <MaterialCommunityIcons
          name="trash-can"
          size={20}
          color={DANGER.DEFAULT}
        />
      </Pressable>
    </View>
  );
});

ListItem.displayName = "ListItem";

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  task: {
    flex: 1,
    marginHorizontal: 10,
  },
  isDone: {
    marginRight: 10,
  },
});

export default ListItem;

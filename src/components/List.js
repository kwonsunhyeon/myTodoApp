import { View } from "react-native";
import { FlatList, StyleSheet } from "react-native";
import { GRAY } from "../Color";
import PropTypes from "prop-types";
import ListItem from "./ListItem";

const Separator = () => {
  return <View style={styles.separator}></View>;
};

const List = ({ data, onDelete, onToggle }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ListItem item={item} onDelete={onDelete} onToggle={onToggle} />
      )}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={() => <View style={{ height: 10 }}></View>}
      windowSize={2}
    />
  );
};

List.propTypes = {
  data: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: GRAY.LIGHT,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default List;

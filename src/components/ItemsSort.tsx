/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../themes/colors';

const ItemsSort = ({
  title,
  onPress,
  sortBy,
}: {
  title: string;
  onPress: () => void;
  sortBy: string;
}) => {
  return (
    <TouchableOpacity style={styles.wrap} onPress={onPress}>
      <Text
        style={[
          styles.text,
          {
            fontWeight: sortBy === title?.toLowerCase() ? 'bold' : 'normal',
            color:
              sortBy === title?.toLowerCase() ? colors.purple : colors.textGrey,
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ItemsSort;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  wrap: {
    borderColor: '#585858',
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
});

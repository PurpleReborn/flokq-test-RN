import {StyleSheet, View} from 'react-native';
import React from 'react';
import colors from '../themes/colors';

const AlbumSkeleton = () => {
  const data = new Array(9).fill('');

  return (
    <View>
      {data.map((item, index) => {
        return (
          <View key={index} style={styles.wrap}>
            <View style={styles.img} />
            <View style={styles.wrapTitle}>
              <View style={styles.title} />
              <View style={styles.artist} />
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default AlbumSkeleton;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  img: {
    width: 60,
    height: 60,
    marginRight: 10,
    backgroundColor: colors.darkGrey,
  },
  title: {
    backgroundColor: colors.darkGrey,
    width: '70%',
    height: 15,
    marginBottom: 5,
  },
  artist: {
    backgroundColor: colors.darkGrey,
    width: '50%',
    height: 15,
  },
  wrapTitle: {
    flex: 1,
  },
});

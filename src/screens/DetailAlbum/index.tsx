import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import colors from '../../themes/colors';

const DetailAlbum = ({route}: any) => {
  const {item} = route.params;

  return (
    <View style={styles.container}>
      <Header title={'Detail'} />
      <View style={styles.wrap}>
        <Image source={{uri: item?.['im:image'][2].label}} style={styles.img} />
        <Text style={styles.title}>{item?.['im:name'].label}</Text>
        <Text style={styles.artist}>{item?.['im:artist']?.label}</Text>
        <Text style={styles.release}>
          {item?.['im:releaseDate']?.label?.slice(0, 10)}
        </Text>
        <View>
          <View style={styles.wrapCategory}>
            <Text style={styles.labelCategory}>Category : </Text>
            <Text style={styles.category}>
              {item?.category?.attributes?.label}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.wrapBtn}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.currency}>
            {item?.['im:price']?.attributes?.currency}
          </Text>
          <Text style={styles.price}>{item?.['im:price']?.label}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailAlbum;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgDark,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.textGrey,
    marginTop: 20,
  },
  wrap: {
    padding: 12,
  },
  img: {
    width: '100%',
    height: 300,
  },
  artist: {
    color: colors.textGrey,
    fontSize: 20,
  },
  release: {
    color: colors.textGrey,
    fontSize: 14,
  },
  labelCategory: {
    fontSize: 18,
    color: colors.textGrey,
  },
  wrapCategory: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  category: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.textGrey,
  },
  price: {
    color: colors.textGrey,
    fontWeight: 'bold',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.purple,
    paddingVertical: 16,
    borderRadius: 6,
    flexDirection: 'row',
  },
  wrapBtn: {
    width: '100%',
    paddingHorizontal: 12,
    position: 'absolute',
    bottom: 20,
  },
  currency: {
    marginRight: 10,
    color: colors.textGrey,
    fontWeight: 'bold',
  },
});

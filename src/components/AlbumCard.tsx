import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../themes/colors';
import {useNavigation} from '@react-navigation/native';

const AlbumCard = ({item}: any) => {
  const navigation: any = useNavigation();

  const onPressDetail = () => {
    navigation.navigate('DetailAlbum', {
      item,
    });
  };

  return (
    <TouchableOpacity style={styles.wrap} onPress={onPressDetail}>
      <Image source={{uri: item?.['im:image'][2].label}} style={styles.img} />
      <View>
        <Text style={styles.title}>{item?.['im:name'].label}</Text>
        <Text style={styles.artist}>{item['im:artist'].label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AlbumCard;

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
  },
  title: {
    fontWeight: 'bold',
    color: colors.textGrey,
  },
  artist: {
    color: colors.textGrey,
  },
});

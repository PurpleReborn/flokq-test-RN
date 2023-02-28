import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../themes/colors';
import {useNavigation} from '@react-navigation/native';

const Header = ({title, type}: {title: string; type?: string}) => {
  const navigation = useNavigation<any>();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {type !== 'home' ? (
        <TouchableOpacity style={styles.wrapBack} onPress={goBack}>
          <Image
            style={styles.back}
            source={require('../assets/ImgBack.png')}
          />
        </TouchableOpacity>
      ) : null}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: colors.textGrey,
    width: '100%',
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 14,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGrey,
  },
  back: {},
  wrapBack: {
    position: 'absolute',
    paddingLeft: 10,
    paddingRight: 20,
    zIndex: 2,
  },
});

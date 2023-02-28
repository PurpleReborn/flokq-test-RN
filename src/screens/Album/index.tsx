/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, StyleSheet, TextInput} from 'react-native';
import axios from 'axios';
import AlbumCard from '../../components/AlbumCard';
import AlbumSkeleton from '../../components/AlbumSkeleton';
import colors from '../../themes/colors';
import Header from '../../components/Header';
import {debounce} from 'lodash';
import ItemsSort from '../../components/ItemsSort';
import moment from 'moment';

function Album() {
  const [albums, setAlbums] = useState<any>([]);
  const [filterData, setFilterData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>();
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('releaseDate');

  const sortOptions = [
    {title: 'Price', type: 'price'},
    {title: 'Artist', type: 'artist'},
    {title: 'Release', type: 'release'},
  ];

  const getAlbum = () => {
    setLoading(true);
    axios
      .get('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
      .then(res => {
        setAlbums(res?.data?.feed?.entry);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const debounceSearch = debounce(text => {
    setSearch(text);
  }, 1000);

  const getSearch = () => {
    if (search?.length > 0) {
      const res = albums?.filter((item: any) => {
        let title = item?.['im:name']?.label.toLowerCase();
        let artist = item['im:artist'].label.toLowerCase();
        return (
          title.includes(search.toLowerCase()) ||
          artist.includes(search.toLowerCase())
        );
      });
      setFilterData(res);
      return;
    }
    setFilterData(albums);
    return;
  };

  const handleSort = (type: string) => {
    const sortedAlbums = filterData.slice().sort((a: any, b: any) => {
      if (type === 'price') {
        return (
          parseFloat(a['im:price'].attributes.amount) -
          parseFloat(b['im:price'].attributes.amount)
        );
      } else if (type === 'artist') {
        return a['im:artist'].label.localeCompare(b['im:artist'].label);
      } else if (type === 'release') {
        const dateA: any = new Date(
          moment(a['im:releaseDate'].label).format('MM-DD-YYYY'),
        );
        const dateB: any = new Date(
          moment(b['im:releaseDate'].label).format('MM-DD-YYYY'),
        );
        return dateA - dateB;
      }
    });
    setSortBy(type);
    setFilterData(sortedAlbums);
  };

  useEffect(() => {
    getAlbum();
  }, []);

  useEffect(() => {
    getSearch();
  }, [search, albums]);

  return (
    <View style={styles.container}>
      <Header title={'Top Albums'} type={'home'} />
      <TextInput
        placeholder="Search"
        onChangeText={text => debounceSearch(text)}
        style={styles.search}
        placeholderTextColor={colors.textGrey}
      />
      <View style={styles.wrapSort}>
        <Text style={styles.sortBy}>Sort by :</Text>
        <View style={styles.rowSort}>
          {sortOptions.map((item, index) => {
            return (
              <ItemsSort
                key={index}
                title={item?.title}
                onPress={() => handleSort(item?.type)}
                sortBy={sortBy}
              />
            );
          })}
        </View>
      </View>
      <View style={styles.wrap}>
        {!loading && filterData.length > 0 ? (
          <FlatList
            data={filterData}
            keyExtractor={album => album?.id?.attributes?.['im:id']}
            renderItem={({item}) => <AlbumCard item={item} />}
          />
        ) : null}
        {!loading && filterData.length === 0 ? (
          <View style={styles.wrapNotfound}>
            <Text style={styles.textNoFound}>No found data</Text>
          </View>
        ) : null}
        {loading ? <AlbumSkeleton /> : null}
      </View>
    </View>
  );
}

export default Album;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgDark,
  },
  wrapNotfound: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrap: {
    paddingHorizontal: 12,
  },
  textNoFound: {
    fontWeight: 'bold',
    color: colors.textGrey,
  },
  search: {
    color: colors.textGrey,
    borderWidth: 1,
    borderColor: '#585858',
    borderRadius: 2,
    margin: 10,
    padding: 10,
  },
  wrapSort: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    paddingBottom: 10,
  },
  rowSort: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sortBy: {
    color: colors.textGrey,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

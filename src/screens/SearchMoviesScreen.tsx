import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {useSearchData} from './services/DbDataService';
import {useState} from 'react';
import {SearchFlatListItem} from '../components/SearchFlatListItem';

export const SearchMoviesScreen = () => {
  const [search, setSearch] = useState<string>('');
  let [data] = useSearchData('movie', search);

  // setting text for query, handle empty query
  const searchFilterFunction = (text: string) => {
    if (text) {
      setSearch(text);
    } else {
      setSearch('');
    }
  };

  const renderItem = ({item}: any) => <SearchFlatListItem item={item} />;

  const ItemSeparatorView = () => {
    return <View style={styles.itemSeparator} />;
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <SearchBar
          round
          searchIcon={{size: 24}}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={() => searchFilterFunction('')}
          placeholder="Search movie"
          value={search}
          containerStyle={{backgroundColor: 'black'}}
          selectionColor={'white'}
        />
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
  itemSeparator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#222222',
  },
});

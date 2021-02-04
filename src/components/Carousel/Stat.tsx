import React from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MovieScreens} from '../../navigation/Screens';
import LinearGradient from 'react-native-linear-gradient';

export const Stat = (props: any) => {
  const {item, categoryList, filtered, itemsPerInterval} = props;
  const navigation = useNavigation();

  // get category name (calling it with first category id from array of categories of item)
  const getCategoryName = (catItem: any, list: any) => {
    const category = list.find((cat: any) => cat.id === catItem);
    return category.name;
  };

  return (
    <TouchableHighlight
      style={[styles.stat, {flex: itemsPerInterval}]}
      onPress={() =>
        item
          ? navigation.navigate(MovieScreens.MOVIE_DETAIL, {
              item: {item},
            })
          : null
      }>
      <ImageBackground
        source={{uri: 'https://image.tmdb.org/t/p/w342' + item.poster_path}}
        style={{width: '100%', height: '100%'}}
        imageStyle={{resizeMode: 'cover'}}>
        <LinearGradient
          colors={['transparent', 'black']}
          style={styles.gradient}
        />
        <Text style={[styles.statTitle, {bottom: filtered ? 20 : 40}]}>
          {item.name || item.title}
        </Text>
        <Text style={styles.statCategory} numberOfLines={1}>
          {item.genre_ids !== undefined && !filtered
            ? getCategoryName(item.genre_ids[0], categoryList)
            : null}
        </Text>
      </ImageBackground>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  stat: {
    height: 200,
    paddingHorizontal: 5,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  statTitle: {
    position: 'absolute',
    left: 5,
    width: '100%',
    textAlign: 'left',
    fontSize: 15,
    color: 'white',
  },
  statCategory: {
    position: 'absolute',
    bottom: 20,
    left: 5,
    width: '100%',
    textAlign: 'left',
    fontSize: 15,
    color: '#AAAAAA',
  },
  gradient: {
    width: '100%',
    height: 230,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
});

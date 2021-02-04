import React from 'react';
import {Text, StyleSheet, TouchableHighlight, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MovieScreens} from '../navigation/Screens';

const imageUrl = 'http://image.tmdb.org/t/p/w342';

export const SearchFlatListItem = (props: any) => {
  const navigation = useNavigation();
  const {item} = props;

  // define count of stars
  const getStars = (count: number) => {
    const stars: any = [];
    for (let i = 1; i <= count; i++) {
      stars.push(
        <Image
          key={i}
          style={styles.star}
          source={require('../assets/star.png')}
        />,
      );
    }
    return stars;
  };

  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate(MovieScreens.MOVIE_DETAIL, {
          item: {item},
        });
      }}>
      <View style={styles.item}>
        <Image
          source={{uri: imageUrl + item.poster_path}}
          style={styles.itemImage}
        />
        <View style={styles.itemContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.overview}
          </Text>
          <View style={styles.stars}>
            {getStars(Math.round(item.vote_average / 2))}
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
  },
  itemImage: {
    width: 90,
    height: 120,
    margin: 5,
  },
  star: {
    height: 12,
    width: 12,
    paddingHorizontal: 5,
  },
  stars: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  description: {
    color: '#AAAAAA',
    fontSize: 15,
  },
  itemContent: {
    marginLeft: 20,
    marginTop: 10,
    maxWidth: '70%',
  },
});

import React from 'react';
import {
  Text,
  ImageBackground,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MovieScreens} from '../../navigation/Screens';
import LinearGradient from 'react-native-linear-gradient';

export const Slide = (props: any) => {
  const {item} = props;
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      style={styles.slide}
      onPress={() =>
        navigation.navigate(MovieScreens.MOVIE_DETAIL, {
          item: {item},
        })
      }>
      <ImageBackground
        source={{uri: 'http://image.tmdb.org/t/p/w342' + item.backdrop_path}}
        style={{height: '100%', width: '100%'}}
        imageStyle={{resizeMode: 'cover'}}>
        <LinearGradient
          colors={['transparent', 'black']}
          style={styles.gradient}
        />
        <Text style={styles.slideText}>{item.title || item.name}</Text>
      </ImageBackground>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  slide: {
    flexBasis: '100%',
    flex: 1,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: 200,
  },
  slideText: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    width: '100%',
    textAlign: 'left',
    fontSize: 25,
    color: 'white',
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

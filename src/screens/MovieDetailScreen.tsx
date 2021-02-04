import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDimensions} from '@react-native-community/hooks';
import LinearGradient from 'react-native-linear-gradient';
import {MovieScreens} from '../navigation/Screens';

export const MovieDetailScreen = (props: any) => {
  const navigation = useNavigation();
  const dimension = useDimensions();
  // get item data from route
  const params = props.route.params.item.item;
  const imageURL = 'https://image.tmdb.org/t/p/w342';

  // dimension state
  const IsLandscape = () => {
    return dimension.screen.width >= dimension.screen.height;
  };

  return (
    <View style={styles.container}>
      <View>
        <ImageBackground
          source={{uri: imageURL + params.backdrop_path}}
          style={{
            height: IsLandscape() ? 150 : 250,
          }}
          imageStyle={{resizeMode: 'cover'}}
        />
        <LinearGradient
          colors={['black', 'transparent']}
          style={styles.gradient}
        />
        <TouchableOpacity
          style={[
            styles.header,
            {
              zIndex: 1,
              top: IsLandscape() ? 30 : 60,
              height: 40,
              width: 20,
            },
          ]}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/arrowLightLeftIcon.png')}
            style={{height: 15, width: 15}}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.header,
            {
              top: IsLandscape() ? 25 : 55,
              left: 60,
              fontSize: 20,
            },
          ]}>
          {params.title || params.name}
        </Text>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigation.navigate(MovieScreens.TRAILER_FULL_SCREEN, {
              title: params.title || params.name,
            })
          }>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            {'🎥 Watch trailer'}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Text style={styles.content}>{params.overview}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
  header: {
    position: 'absolute',
    paddingLeft: 27,
    paddingRight: 27,
    fontSize: 18,
    color: 'white',
  },
  content: {
    color: 'white',
    paddingTop: 35,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 15,
  },
  actionButton: {
    position: 'absolute',
    bottom: 20,
    right: 35,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 40,
    borderWidth: 0,
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

import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDimensions} from '@react-native-community/hooks';
import LinearGradient from 'react-native-linear-gradient';
import VideoPlayer from '../components/VideoPlayer';

export const TrailerVideoFullScreen = (props: any) => {
  const navigation = useNavigation();
  const dimension = useDimensions();
  // get data from route
  const params = props.route.params;

  // dimension state
  const IsLandscape = () => {
    return dimension.screen.width >= dimension.screen.height;
  };

  return (
    <View style={styles.container}>
      <View style={{zIndex: 1}}>
        <LinearGradient
          colors={['black', 'transparent']}
          style={styles.gradient}
        />
        <TouchableOpacity
          style={[
            styles.header,
            {
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
          {params.title}
        </Text>
      </View>
      <View style={styles.videoContainer}>
        <VideoPlayer source={require('../assets/big_buck_bunny.mp4')} />
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
  header: {
    position: 'absolute',
    paddingLeft: 27,
    paddingRight: 27,
    fontSize: 18,
    color: 'white',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  gradient: {
    width: '100%',
    height: 80,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
});

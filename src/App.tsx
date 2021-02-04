import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './navigation/RootNavigation';
import * as RootNavigation from './navigation/RootNavigation';
import {createStackNavigator} from '@react-navigation/stack';
import {MovieScreens} from './navigation/Screens';
import {HomeScreen} from './screens/HomeScreen';
import {MovieDetailScreen} from './screens/MovieDetailScreen';
import {TrailerVideoFullScreen} from './screens/TrailerVideoFullScreen';
import {SearchMoviesScreen} from './screens/SearchMoviesScreen';
import {Image, TouchableOpacity} from 'react-native';

const RootStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={{headerTintColor: '#AAAAAA'}}>
        <RootStack.Screen
          name={MovieScreens.HOME_SCREEN}
          component={HomeScreen}
          options={{
            headerTitle: 'Discover',
            headerStyle: {
              backgroundColor: 'black',
              shadowColor: 'transparent',
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() =>
                  RootNavigation.navigate(MovieScreens.SEARCH_SCREEN, null)
                }>
                <Image
                  source={require('./assets/search.png')}
                  style={{marginRight: 15}}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <RootStack.Screen
          name={MovieScreens.MOVIE_DETAIL}
          component={MovieDetailScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name={MovieScreens.TRAILER_FULL_SCREEN}
          component={TrailerVideoFullScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name={MovieScreens.SEARCH_SCREEN}
          component={SearchMoviesScreen}
          options={{
            headerTitle: 'Explore',
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: 'black',
              shadowColor: 'transparent',
            },
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;

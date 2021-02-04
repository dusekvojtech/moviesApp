import {
  View,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  StatusBar,
  YellowBox,
} from 'react-native';
import React from 'react';
import {useContentData, useGenreData} from './services/DbDataService';
import Carousel from '../components/Carousel/Carousel';

// hide warning for Image RN bug
YellowBox.ignoreWarnings(['Task orphaned']);

//define basic categories data
const familyCategory = {
  name: 'Family',
  id: 10751,
};

const documentaryCategory = {
  name: 'Documentary',
  id: 99,
};

const scifiCategory = {
  id: 10765,
  name: 'Sci-Fi & Fantasy',
};

export interface ContentData {
  overview: string;
  release_date: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  vote_count: number;
  original_language: string;
  id: number;
  poster_path: string;
  title: string;
  video: boolean;
  vote_average: number;
  original_title: string;
  popularity: number;
  media_type: string;
}
export interface GenreData {
  id: number;
  name: string;
}

export const HomeScreen = () => {
  // call data for homeScreen
  const [movieGenreData, movieGenreLoading] = useGenreData('movie');
  const [tvGenreData, tvGenreLoading] = useGenreData('tv');
  const [movieData, movieLoading] = useContentData('movie', 'day');
  const [tvShowData, tvShowLoading] = useContentData('tv', 'day');

  // status for data availability
  const moviesNotReadyToLoad =
    movieLoading ||
    movieGenreLoading ||
    movieData === undefined ||
    movieGenreData === undefined;
  const tvShowsNotReadyToLoad =
    tvShowLoading ||
    tvGenreLoading ||
    tvShowData === undefined ||
    tvGenreData === undefined;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView>
        <View style={{minHeight: 220}}>
          {moviesNotReadyToLoad ? (
            <ActivityIndicator
              size="large"
              color="#AAAAAA"
              style={styles.activityIndicator}
            />
          ) : (
            <Carousel
              title={'Trending Movies'}
              style="slide"
              items={movieData}
              categories={tvGenreData}
            />
          )}
        </View>
        <View>
          {tvShowsNotReadyToLoad ? (
            <ActivityIndicator
              size="large"
              color="#AAAAAA"
              style={styles.activityIndicator}
            />
          ) : (
            <Carousel
              title={'Trending TV Shows'}
              style="stats"
              itemsPerInterval={3}
              items={tvShowData}
              categories={tvGenreData}
            />
          )}
        </View>
        <View>
          {tvShowsNotReadyToLoad ? (
            <ActivityIndicator
              size="large"
              color="#AAAAAA"
              style={styles.activityIndicator}
            />
          ) : (
            <Carousel
              title={'TV Shows'}
              style="stats"
              itemsPerInterval={3}
              items={tvShowData}
              categories={tvGenreData}
              filterCategory={documentaryCategory}
            />
          )}
        </View>
        <View>
          {tvShowsNotReadyToLoad ? (
            <ActivityIndicator
              size="large"
              color="#AAAAAA"
              style={styles.activityIndicator}
            />
          ) : (
            <Carousel
              title={'TV Shows'}
              style="stats"
              itemsPerInterval={3}
              items={tvShowData}
              categories={tvGenreData}
              filterCategory={familyCategory}
            />
          )}
        </View>
        <View>
          {moviesNotReadyToLoad ? (
            <ActivityIndicator
              size="large"
              color="#AAAAAA"
              style={styles.activityIndicator}
            />
          ) : (
            <Carousel
              title={'Movies'}
              style="stats"
              itemsPerInterval={3}
              items={movieData}
              categories={movieGenreData}
              filterCategory={familyCategory}
            />
          )}
        </View>
        <View>
          {moviesNotReadyToLoad ? (
            <ActivityIndicator
              size="large"
              color="#AAAAAA"
              style={styles.activityIndicator}
            />
          ) : (
            <Carousel
              title={'Movies'}
              style="stats"
              itemsPerInterval={3}
              items={movieData}
              categories={movieGenreData}
              filterCategory={documentaryCategory}
            />
          )}
        </View>
        <View>
          {tvShowsNotReadyToLoad ? (
            <ActivityIndicator
              size="large"
              color="#AAAAAA"
              style={styles.activityIndicator}
            />
          ) : (
            <Carousel
              title={'TV Shows'}
              style="stats"
              itemsPerInterval={2}
              items={tvShowData}
              categories={tvGenreData}
              filterCategory={scifiCategory}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#000000',
  },
  activityIndicator: {
    height: 200,
  },
});

import {useEffect, useState} from 'react';
import {ContentData, GenreData} from '../HomeScreen';
import {Alert} from 'react-native';

const API_KEY = '?api_key=8e47b7fb13f2673849cbd69d937bd6c6';

export const useContentData = (mediaType: string, time: string): any => {
  const baseUrl = 'https://api.themoviedb.org/3/trending/';
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ContentData[]>();

  useEffect(() => {
    const fetchData = async () => {
      const FINAL_URL = baseUrl + mediaType + '/' + time + API_KEY;
      const response = await fetch(FINAL_URL);

      await response
        .json()
        .then((res) => {
          if (response.ok) {
            setData(res.results);
          } else {
            console.log('failed to fetch ');
            Alert.alert('Network error', response.statusText);
          }
        })
        .catch((error) => {
          console.log('failed to fetch');
          throw error;
        });
      setLoading(false);
    };
    fetchData();
  }, [mediaType, time]);
  return [data, loading];
};

export const useGenreData = (mediaType: string): any => {
  const baseUrl = 'https://api.themoviedb.org/3/genre/';
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<GenreData[]>();

  useEffect(() => {
    const fetchData = async () => {
      const FINAL_URL = baseUrl + mediaType + '/list' + API_KEY;
      const response = await fetch(FINAL_URL);

      await response
        .json()
        .then((res) => {
          if (response.ok) {
            setData(res.genres);
          } else {
            console.log('failed to fetch ');
            Alert.alert('Network error', response.statusText);
          }
        })
        .catch((error) => {
          console.log('failed to fetch');
          throw error;
        });
      setLoading(false);
    };
    fetchData();
  }, [mediaType]);
  return [data, loading];
};

export const useSearchData = (mediaType: string, query: string): any => {
  const baseUrl = 'https://api.themoviedb.org/3/search/';
  const [data, setData] = useState<ContentData[]>();

  useEffect(() => {
    const fetchData = async () => {
      const FINAL_URL = baseUrl + mediaType + API_KEY + '&query=' + query;

      const response = await fetch(FINAL_URL);

      await response
        .json()
        .then((res) => {
          if (response.ok) {
            setData(res.results);
          } else {
            console.log('failed to fetch ');
            Alert.alert('Network error', response.statusText);
          }
        })
        .catch((error) => {
          console.log('failed to fetch');
          throw error;
        });
    };

    if (query) {
      fetchData();
    } else {
      setData([]);
    }
  }, [mediaType, query]);
  return [data];
};

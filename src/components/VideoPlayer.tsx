import React, {useState, useRef} from 'react';
import {StyleSheet, View, Platform, YellowBox} from 'react-native';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import Video from 'react-native-video';
import {useDimensions} from '@react-native-community/hooks';

const VideoPlayer = (props: any) => {
  const {source} = props;
  const dimension = useDimensions();

  // hide warning for MediaControls
  YellowBox.ignoreWarnings([
    'Warning: componentWillMount',
    'Warning: componentWillReceiveProps',
  ]);

  const videoPlayer = useRef(null);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [isLoading, setIsLoading] = useState(true);

  const onSeek = (seek: any) => {
    // @ts-ignore
    videoPlayer?.current.seek(seek);
  };

  const onSeeking = (currentVideoTime: React.SetStateAction<number>) =>
    setCurrentTime(currentVideoTime);

  const onPaused = (newState: any) => {
    setPaused(!paused);
    setPlayerState(newState);
  };

  const onReplay = () => {
    // @ts-ignore
    videoPlayer?.current.seek(0);
    setCurrentTime(0);
    if (Platform.OS === 'android') {
      setPlayerState(PLAYER_STATES.PAUSED);
      setPaused(true);
    } else {
      setPlayerState(PLAYER_STATES.PLAYING);
      setPaused(false);
    }
  };

  const onProgress = (data: {currentTime: React.SetStateAction<number>}) => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data: {duration: number}) => {
    setDuration(Math.round(data.duration));
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    setCurrentTime(duration);
  };

  return (
    <View>
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        posterResizeMode={'cover'}
        onProgress={onProgress}
        paused={paused}
        ref={(ref: null) => (videoPlayer.current = ref)}
        resizeMode={'cover'}
        source={source}
        style={{
          height:
            dimension.screen.width >= dimension.screen.height ? '100%' : 250,
          width: '100%',
        }}
      />
      <MediaControls
        isFullScreen={false}
        duration={duration}
        isLoading={isLoading}
        progress={currentTime}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        mainColor={'black'}
        playerState={playerState}
        sliderStyle={{containerStyle: {}, thumbStyle: {}, trackStyle: {}}}
        children={null}
        containerStyle={{}}
        toolbarStyle={{}}
      />
    </View>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create({
  mediaControls: {
    height: '100%',
    flex: 1,
    alignSelf: 'center',
  },
});

export default VideoPlayer;

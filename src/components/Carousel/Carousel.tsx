import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {Stat} from './Stat';
import {Slide} from './Slide';

export const Carousel = (props: any) => {
  const {title, items, style, categories, filterCategory} = props;
  const itemsPerInterval =
    props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;

  const [interval, setInterval] = React.useState(1);
  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);

  //filterItems
  const filteredItems =
    filterCategory !== undefined
      ? items.filter(
          (item: any) =>
            item.id !== undefined && item.genre_ids.includes(filterCategory.id),
        )
      : items;

  // initialise empty items for stats
  if (style === 'stats' && filteredItems.length % itemsPerInterval !== 0) {
    while (filteredItems.length % itemsPerInterval !== 0) {
      filteredItems.push('');
    }
  }

  const init = (w: number) => {
    // initialise width
    setWidth(w);
    // initialise total intervals
    const totalItems = filteredItems.length;
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
  };

  // get current interval of carousel
  /*const getInterval = (offset: any, intervals: number) => {
    for (let i = 1; i <= intervals; i++) {
      if (offset + 1 < (width / intervals) * i) {
        return i;
      }
      if (i === intervals) {
        return i;
      }
    }
  };*/

  // define bullets for carousel
  const getBullets = (bulletIntervals: number, bulletInterval: number) => {
    let bullets: any = [];
    for (let i = 1; i <= bulletIntervals; i++) {
      bullets.push(
        <Text
          key={i}
          style={{
            ...styles.bullet,
            opacity: bulletInterval === i ? 0.5 : 0.1,
          }}>
          &bull;
        </Text>,
      );
    }
    return bullets;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {(filterCategory !== undefined ? filterCategory.name + ' ' : '') +
          title}
      </Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          ...styles.scrollView,
          width: `${100 * intervals}%`,
        }}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w) => init(w)}
        onScroll={(data) => {
          setWidth(data.nativeEvent.contentSize.width);
          setInterval(
            Number(
              getInterval(data.nativeEvent.contentOffset.x, intervals, width),
            ),
          );
        }}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate="fast">
        {filteredItems.map((item: any, index: number) => {
          switch (style) {
            case 'stats':
              return (
                <Stat
                  key={index}
                  item={item}
                  filtered={filterCategory ? true : false}
                  categoryList={categories}
                  itemsPerInterval={itemsPerInterval}
                />
              );
            default:
              return <Slide key={index} item={item} />;
          }
        })}
      </ScrollView>
      {filteredItems.length <= 0 ? (
        <Text style={styles.noData}>{'No items'}</Text>
      ) : null}
      <View style={styles.bullets}>{getBullets(intervals, interval)}</View>
    </View>
  );
};

export default Carousel;

// get current interval of carousel (defined out of Carousel for export to unit test)
export const getInterval = (offset: any, intervals: number, width: number) => {
  for (let i = 1; i <= intervals; i++) {
    if (offset + 1 < (width / intervals) * i) {
      return i;
    }
    if (i === intervals) {
      return i;
    }
  }
};

const styles = StyleSheet.create({
  statsHead: {
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  container: {
    width: '100%',
    marginBottom: 20,
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  bullets: {
    position: 'absolute',
    bottom: 5,
    right: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  bullet: {
    paddingHorizontal: 5,
    fontSize: 20,
    color: 'white',
  },
  title: {
    color: '#AAAAAA',
    fontSize: 18,
    padding: 5,
  },
  noData: {
    color: '#AAAAAA',
    alignSelf: 'center',
    paddingTop: 90,
    height: 200,
  },
});

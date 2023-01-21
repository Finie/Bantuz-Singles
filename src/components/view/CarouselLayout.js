import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Carousel from 'react-native-anchor-carousel';
import Text from '../Text';
import Slider1 from 'src/assets/images/sliderone.png'; //
import Slider2 from 'src/assets/images/slidetwo.png';
import Slider3 from 'src/assets/images/slidethree.png';

const CarouselLayout = ({onScroll, renderNextto}) => {
  const {width: windowWidth} = Dimensions.get('window');
  var carousel = useRef(null);

  useEffect(() => {
    if (carousel !== null) {
      // carousel.current.scrollToIndex(renderNextto);
    }
  }, [renderNextto]);

  const data = [
    {
      id: 0,
      image: Slider2,
    },
    {
      id: 1,
      image: Slider1,
    },
    {
      id: 2,
      image: Slider3,
    },
  ];

  const renderItem = ({item, index}) => {
    return (
      <View
        style={styles.item}
        onPress={() => {
          carousel.current.scrollToIndex(index);
        }}>
        <Image style={styles.imageRender} source={item.image} />
      </View>
    );
  };

  const styles = StyleSheet.create({
    carousel: {
      flexGrow: 0,
      height: 350,
      paddingVertical: 16,
    },
    item: {borderRadius: 32, overflow: 'hidden'},
    itemContainerStyle: {
      borderRadius: 30,
      overflow: 'hidden',
    },
    imageRender: {
      width: '100%',
      height: 350,
    },
  });

  const onScrollEvent = value => {
    onScroll(value);
  };

  return (
    <View style={{}}>
      <Carousel
        ref={carousel}
        initialIndex={1}
        data={data}
        renderItem={renderItem}
        style={styles.carousel}
        itemWidth={windowWidth * 0.6}
        containerWidth={windowWidth}
        separatorWidth={24}
        finCurrentIndex={onScrollEvent}
        inActiveScale={0.8}
        itemContainerStyle={styles.itemContainerStyle}
      />
    </View>
  );
};

export default CarouselLayout;

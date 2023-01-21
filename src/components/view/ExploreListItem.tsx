import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';

const ExploreListItem = ({image, onPress}) => {
  const styles = StyleSheet.create({
    container: {
      margin: 8,
    },

    // overlay: {
    //   ...StyleSheet.absoluteFillObject,
    //   backgroundColor: 'rgba(0,0,0,0.5)',
    // },
    imagestyle: {
      width: 175,
      height: 175,
    },
  });
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image style={styles.imagestyle} source={image} />
    </TouchableOpacity>
  );
};

export default ExploreListItem;

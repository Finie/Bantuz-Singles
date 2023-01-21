import * as React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import {onScrollEvent} from 'react-native-redash';
// import {onScrollEvent} from 'react-native-redash/lib/module/v1';

import {Album, MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT} from './Model';
import Track from './Track';
import ShufflePlay, {BUTTON_HEIGHT} from './ShufflePlay';
import Header from './Header';
import {colors} from '@react-spring/shared';
import Text from '../Text';

import ArrowBack from 'src/assets/icons/arrowback.svg';
import useThemeStyles from 'src/hooks/useThemeStyles';
import Chat from 'src/assets/icons/chatwhite.svg';
import Direction from 'src/assets/icons/directions.svg';
import Musicnote from 'src/assets/icons/musicnote.svg';
import Fashion from 'src/assets/icons/fashionprimary.svg';
import PaintPrimary from 'src/assets/icons/fooddrinkprimary.svg';
import Foodiconprimaty from 'src/assets/icons/paintprimary.svg';
import BirthDayCake from 'src/assets/icons/birthdaycake.svg';
import Close from 'src/assets/icons/close.svg';
import Block from 'src/assets/icons/block.svg';
import BaseContextProvider from 'src/context/BaseContextProvider';
import {UserProfile} from 'src/utils/shared.types';
import PassionItem from '../PassionItem';
import {VerticalMapList} from '../view/VerticalMapList';
import moment from 'moment';

interface ContentProps {
  album: Album;
  y: Animated.Value<number>;
}

const {interpolateNode, Extrapolate} = Animated;

export default ({album: {artist, tracks}, y}: ContentProps) => {
  const {colors} = useThemeStyles();
  const {userData} = React.useContext(BaseContextProvider);
  const userProfile: UserProfile = userData;
  const height = interpolateNode(y, {
    inputRange: [-MAX_HEADER_HEIGHT, -BUTTON_HEIGHT / 2],
    outputRange: [0, MAX_HEADER_HEIGHT + BUTTON_HEIGHT],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacity = interpolateNode(y, {
    inputRange: [-MAX_HEADER_HEIGHT / 2, 0, MAX_HEADER_HEIGHT / 2],
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: MIN_HEADER_HEIGHT - BUTTON_HEIGHT / 2,
    },
    cover: {
      height: MAX_HEADER_HEIGHT - BUTTON_HEIGHT,
    },
    gradient: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      alignItems: 'center',
    },
    artistContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
    },
    artist: {
      textAlign: 'center',
      color: 'white',
      fontSize: 48,
      fontWeight: 'bold',
    },
    header: {
      marginTop: -BUTTON_HEIGHT,
    },
    tracks: {
      paddingTop: 32,
      backgroundColor: colors.white,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      flexGrow: 1,
      paddingHorizontal: 30,
    },
    scroll: {
      flexGrow: 1,
    },

    nametext: {
      fontSize: 32,
      fontWeight: '600',
      lineHeight: 39,
      color: colors.black,
    },

    directioncontainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 16,
    },
    directionstyles: {fontSize: 12, marginLeft: 16},
    abountcontainer: {
      marginVertical: 15,
    },
    about: {
      fontSize: 20,
      lineHeight: 24,
      color: colors.black,
    },
    description: {
      color: colors.black,
      marginVertical: 16,
    },
    descriptio: {
      color: colors.black,
      marginVertical: 16,
      fontWeight: 'bold',
    },
    touch: {
      flexDirection: 'row',
      backgroundColor: colors.snow,
      padding: 12,
      marginRight: 16,
      marginTop: 16,
      borderRadius: 10,
    },
    touchtitle: {
      fontSize: 12,
      lineHeight: 14,
      marginLeft: 16,
      color: colors.black,
    },
    moreabout: {fontSize: 20, lineHeight: 24, color: colors.black},
    moreaboutdescription: {
      fontSize: 16,
      lineHeight: 19,
      color: colors.black,
      marginTop: 10,
    },
    bottom: {
      marginBottom: 150,
      marginTop: 30,
    },
    passionholder: {
      marginTop: 16,
    },
    passioniteholder: {
      marginVertical: 5,
      flexDirection: 'row',
    },
    passion: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '600',
      color: colors.black,
    },
    biosection: {},
  });

  return (
    <Animated.ScrollView
      onScroll={onScrollEvent({y})}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={1}
      contentContainerStyle={styles.scroll}
      stickyHeaderIndices={[1]}
    >
      <View style={styles.cover} />
      <View style={styles.header}>
        <Header {...{y, artist}} />
      </View>
      <View style={styles.tracks}>
        <Text style={styles.nametext}>{`${userProfile.first_name}  ${
          userProfile.last_name
        }, ${`${moment(userProfile.profile.birth_date).fromNow(true)}`.replace(
          'years',
          '',
        )}`}</Text>

        <View style={styles.directioncontainer}>
          <Direction />
          <Text style={styles.directionstyles}>16 miles away</Text>
        </View>

        <View style={styles.abountcontainer}>
          <Text style={styles.about}>About</Text>
          <Text style={styles.description}>{userProfile.profile.bio.bio}</Text>
        </View>

        <View style={styles.abountcontainer}>
          <Text style={styles.about}>I’m looking for ...</Text>
          <Text style={styles.descriptio}>
            {userProfile.profile.bio.looking_for}
          </Text>
        </View>

        <View style={styles.biosection}>
          <Text style={styles.passion}>Passions</Text>

          {/* <View style={styles.info}>
          <Info />
          <Text style={styles.mustpick}>You must pick at least 3</Text>
        </View> */}
          <View style={styles.passionholder}>
            <VerticalMapList
              data={userProfile.profile.bio.passions}
              renderItem={({item, index}) => (
                <PassionItem
                  label={item.name}
                  onItemRemoved={() => {}}
                  onItemAdded={() => {}}
                />
              )}
              numColumns={2}
            />
          </View>
        </View>

        <View style={styles.bottom}>
          <Text style={styles.moreabout}>More about me</Text>
          <Text
            style={styles.moreaboutdescription}
          >{`Ethnicity: ${userProfile.profile.ethnicity}`}</Text>
        </View>
      </View>
    </Animated.ScrollView>
  );
};

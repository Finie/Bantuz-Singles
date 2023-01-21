import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Screen from 'src/components/screen/Screen';
import Text from 'src/components/Text';
import CardStack, {Card} from 'react-native-card-stack-swiper';

import Musicnote from 'src/assets/icons/musicnote.svg';
import Close from 'src/assets/icons/close.svg';
import Info from 'src/assets/icons/infoicon.svg';
import useThemeStyles from 'src/hooks/useThemeStyles';
import Slider1 from 'src/assets/images/sliderone.png';
import Slider2 from 'src/assets/images/slidetwo.png';
import Slider3 from 'src/assets/images/slidethree.png';
import Smiles from 'src/assets/icons/smilebutton.svg';
import Hearts from 'src/assets/icons/buttonheart.svg';
import CloseIcon from 'src/assets/icons/closeicon.svg';
import Rewind from 'src/assets/icons/rewind.svg';
import Direction from 'src/assets/icons/direction.svg';
import Dots from 'src/assets/icons/dotsmenu.svg';
import Fire from 'src/assets/icons/fire.svg';

export default function ExploreResult({navigation, route}) {
  const {colors} = useThemeStyles();
  const [undoType, setundoType] = React.useState('Left');
  const {isSearch, name = '', result} = route.params;

  const swiperInstance = React.useRef(null);

  const undoSwipe = (state: string) => {
    switch (state) {
      case 'Right':
        swiperInstance.current.goBackFromRight();
        break;
      case 'Top':
        swiperInstance.current.goBackFromTop();
        break;
      case 'Bottom':
        swiperInstance.current.goBackFromBottom();
        break;

      default:
        swiperInstance.current.goBackFromLeft();
        break;
    }
  };

  const data = isSearch
    ? result
    : [
        {
          id: 0,
          image: Slider1,
          distance: 16,
          name: 'Irene',
          age: 21,
        },
        {
          id: 1,
          image: Slider2,
          distance: 200,
          name: 'Mike',
          age: 30,
        },
        {
          id: 2,
          image: Slider3,
          distance: 136,
          name: 'Joan',
          age: 23,
        },
        {
          id: 3,
          image: Slider2,
          distance: 405,
          name: 'Alex',
          age: 34,
        },

        {
          id: 4,
          image: Slider3,
          distance: 8,
          name: 'Brenda',
          age: 25,
        },
      ];
  const styles = StyleSheet.create({
    peopletext: {
      fontSize: 20,
      lineHeight: 24,
      fontWeight: '600',
      color: colors.black,
    },
    musicdescription: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.snow,
      marginHorizontal: 16,
      borderRadius: 100,
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
    arttext: {
      marginHorizontal: 8,
    },
    peoplecontainer: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 30,
    },
    numberpersons: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.snow,
      justifyContent: 'center',
      padding: 5,
      borderRadius: 30,
      marginHorizontal: 80,
      marginVertical: 30,
    },
    numberpersonstext: {
      marginLeft: 8,
      fontSize: 12,
      lineHeight: 14,
    },
    content: {
      alignItems: 'center',
      height: 400,
    },
    card: {
      backgroundColor: colors.silver,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 32,
    },
    buttons: {
      height: 60,
      width: '70%',
      marginHorizontal: 60,
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: -30,
      zIndex: 10,
    },
    smileButton: {
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heartsbutton: {
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cancel: {
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: colors.black,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rewind: {
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: colors.silver,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardviewcontainer: {
      height: 400,
      width: 330,
      justifyContent: 'space-between',
    },
    directionholder: {
      marginHorizontal: 16,
      marginVertical: 32,
      flexDirection: 'row',
      alignItems: 'center',
    },
    directiontext: {
      marginLeft: 16,
      fontWeight: '400',
      color: colors.white,
      lineHeight: 15,
    },
    nameagecontainer: {
      marginHorizontal: 16,
      marginVertical: 62,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    nametext: {
      fontWeight: '600',
      color: colors.white,
      lineHeight: 39,
      fontSize: 32,
    },
    agetext: {
      fontWeight: '400',
      color: colors.white,
      lineHeight: 29,
      fontSize: 24,
    },
    checkitout: {
      fontSize: 12,
      lineHeight: 15,
      fontWeight: '700',
      color: colors.secondary,
    },
    checkitouttouchable: {justifyContent: 'center', alignItems: 'center'},
    subscribetext: {
      fontSize: 12,
      lineHeight: 15,
      fontWeight: '700',
      color: colors.black,
    },
    subscribecontainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 8,
    },
    suboverall: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      backgroundColor: colors.accent,
      marginHorizontal: 30,
      borderRadius: 10,
      marginTop: 30,
      marginBottom: 100,
    },
    lastcontainer: {flex: 1, justifyContent: 'flex-end', marginBottom: 90},
  });
  return (
    <Screen
      isheaderVisible
      title={!isSearch ? '' : 'People who fit your search'}
      onBackPress={() => navigation.goBack()}
    >
      {!isSearch ? (
        <View style={styles.peoplecontainer}>
          <Text style={styles.peopletext}>People who love</Text>
          <View style={styles.musicdescription}>
            <Musicnote />
            <Text style={styles.arttext}>{name}</Text>
            <Close />
          </View>
        </View>
      ) : (
        <View style={styles.numberpersons}>
          <Info />
          <Text style={styles.numberpersonstext}>
            {`${data.length} people fit your search filters`}
          </Text>
        </View>
      )}

      <CardStack
        style={styles.content}
        ref={swiper => {
          swiperInstance.current = swiper;
        }}
        onSwiped={() => console.log('onSwiped')}
        // renderNoMoreCards
        onSwipedLeft={() => console.log('onSwipedLeft')}
      >
        {data.map(item => {
          console.log('====================================');
          console.log(item);
          console.log('====================================');
          return (
            <Card style={styles.card} key={item.id}>
              <ImageBackground
                style={styles.cardviewcontainer}
                // source={item?.image || item.default_image}
                source={isSearch ? {uri: item.default_image} : item.image}
              >
                <View style={styles.directionholder}>
                  <Direction />
                  <Text style={styles.directiontext}>
                    {`${item.distance} Km away`}
                  </Text>
                </View>

                <View style={styles.nameagecontainer}>
                  <View>
                    <Text style={styles.nametext}>
                      {item?.name || item.username}
                    </Text>
                    <Text style={styles.agetext}>{item.age}</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('userDetails')}
                  >
                    <Dots />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </Card>
          );
        })}
      </CardStack>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.rewind}
          onPress={() => {
            undoSwipe(undoType);
          }}
        >
          <Rewind />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancel}
          onPress={() => {
            swiperInstance.current.swipeLeft();
            setundoType('Left');
          }}
        >
          <CloseIcon />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            swiperInstance.current.swipeTop();
            setundoType('Top');
          }}
          style={styles.heartsbutton}
        >
          <Hearts />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            swiperInstance.current.swipeRight();
            setundoType('Right');
          }}
          style={styles.smileButton}
        >
          <Smiles />
        </TouchableOpacity>
      </View>

      <View style={styles.suboverall}>
        <Fire />
        <View style={styles.subscribecontainer}>
          <Text style={styles.subscribetext}>
            Subscribe to get more top picks, rewinds, and more!
          </Text>
        </View>
        <TouchableOpacity style={styles.checkitouttouchable}>
          <Text style={styles.checkitout}>Check it out →</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

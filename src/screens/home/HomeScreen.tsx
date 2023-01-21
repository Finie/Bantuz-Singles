import {
  View,
  StatusBar,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Modal, ModalContent} from 'react-native-modals';
import React, {useContext, useEffect, useRef, useState} from 'react';

import useThemeStyles from 'src/hooks/useThemeStyles';
import Text from 'src/components/Text';
import Love from 'src/assets/icons/loveheart.svg';
import Bullble from 'src/assets/icons/bubbleoutline.svg';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import Toast from 'react-native-toast-message';

import CancelingItem from 'src/components/CancelingItem';
import Smiles from 'src/assets/icons/smilebutton.svg';
import Hearts from 'src/assets/icons/buttonheart.svg';
import CloseIcon from 'src/assets/icons/closeicon.svg';
import Rewind from 'src/assets/icons/rewind.svg';
import Direction from 'src/assets/icons/direction.svg';
import Dots from 'src/assets/icons/dotsmenu.svg';
import Fire from 'src/assets/icons/fire.svg';
import FinalCard from 'src/assets/images/finalcard.png';
import homeRouter from 'src/api/routers/homeRouter';
import BaseContextProvider from 'src/context/BaseContextProvider';
import {ExploreMatch, UserProfile} from 'src/utils/shared.types';
import AnimatedLottieView from 'lottie-react-native';
import EncryptionStore from 'src/data/EncryptionStore';

import Whatshotbig from 'src/assets/icons/whatshottwo.svg';
import Button from 'src/components/pressable/Button';
import Inclusive from 'src/assets/icons/inclusive.svg';
import Schedule from 'src/assets/icons/schedule.svg'; //border.svg
import Heart from 'src/assets/icons/border.svg'; //
import Helpers from 'src/Helpers';

export default function HomeScreen({navigation}) {
  const {colors} = useThemeStyles();
  const [undoType, setundoType] = useState('Left');
  const swiperInstance = useRef(null);
  const [remotedata, setRemoteData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalIsVisible] = useState(false);
  const [swipeCount, setswipeCount] = useState(0);
  const [initialData, setInitialData] = useState(0);
  const {setuserData, userData} = useContext(BaseContextProvider);

  const userAccount: UserProfile = userData;
  let maxSwipeCount = 5;

  const getCurrentUser = async () => {
    setIsLoading(true);
    const response = await homeRouter.getCurrentAccounts();
    setIsLoading(false);

    if (response.ok) {
      // EncryptionStore.storeBantuUser(response.data.data);
      setuserData(response.data.data);
      return;
    }

    Toast.show({
      type: 'error',
      text1: 'Request failed',
      text2: response.data?.message,
      position: 'bottom',
    });
  };

  const fetchUsersNearBy = async () => {
    const request = {
      ageRange: '18-60',
      distanceRange: '0-1000',
      page: 1,
      pageSize: 50,
    };
    setIsLoading(true);
    const response = await homeRouter.exploreMatches(request);
    setIsLoading(false);

    if (response.ok) {
      setRemoteData(response.data.data.data);
      setInitialData(response.data.data.data);
      setPage(page + 1);
      return;
    }

    Toast.show({
      type: 'error',
      text1: 'Request failed',
      text2: response.data?.message,
      position: 'bottom',
    });
  };

  const handleUpdateCard = async () => {
    // setRemoteData([]);
    const request = {
      ageRange: '18-60',
      distanceRange: '0-1000',
      page: page,
      pageSize: 50,
    };
    const response = await homeRouter.exploreMatches(request);

    if (response.ok) {
      setRemoteData(response.data.data.data);
      setInitialData(response.data.data.data);
      return;
    }

    Toast.show({
      type: 'error',
      text1: 'Request failed',
      text2: response.data?.message,
      position: 'bottom',
    });
  };

  const matchauserRightSwipe = async (username: string) => {
    const request = {
      username: username,
      status: 'LIKE',
    };
    const response = await homeRouter.postaMatchedUser(request);

    if (response.ok) {
      console.log('====================================');
      console.log(response.data);
      console.log('====================================');
      return;
    }

    console.log('====================================');
    console.log(response);
    console.log('====================================');
  };

  console.log('====================================');
  console.log(userAccount);
  console.log('====================================');

  const matchauserLeftSwipe = async (username: string) => {
    const request = {
      username: username,
      status: 'LIKE',
    };
    const response = await homeRouter.postaMatchedUser(request);

    if (response.ok) {
      console.log('====================================');
      console.log(response.data);
      console.log('====================================');
      return;
    }

    console.log('====================================');
    console.log(response);
    console.log('====================================');
  };

  useEffect(() => {
    getCurrentUser();
    fetchUsersNearBy();
  }, []);

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

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
    },
    backgroundimage: {
      width: '100%',
      height: 130,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 40,
    },
    notificationHolder: {
      backgroundColor: colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      width: 157,
      borderRadius: 10,
      flexDirection: 'row',
      marginHorizontal: 8,
      padding: 16,
    },
    description: {
      marginLeft: 12,
      fontSize: 12,
      lineHeight: 14,
      fontWeight: '600',
      color: colors.black,
    },

    notificationcontainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    dayspick: {
      textAlign: 'center',
      fontSize: 24,
      lineHeight: 30,
      color: colors.black,
      fontWeight: '600',
      marginVertical: 30,
    },
    content: {
      alignItems: 'center',
      height: 400,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    card: {
      backgroundColor: colors.silver,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 32,
    },
    cardviewcontainer: {
      height: 400,
      width: 330,
      justifyContent: 'space-between',
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
    // lastcontainer: {flex: 1, justifyContent: 'flex-end', marginBottom: 90},
    dot: {
      padding: 8,
    },
    lastcontainer: {
      width: 330,
      height: '100%',
      borderRadius: 32,
      backgroundColor: 'red',
    },
    toplayout: {
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 15,
      marginBottom: 40,
    },
    modaldescription: {
      fontSize: 32,
      lineHeight: 39,
      fontWeight: '700',
      color: colors.primary,
      marginTop: 16,
    },
    modelcanceldisclaimer: {
      fontSize: 16,
      lineHeight: 19.44,
      marginVertical: 40,
      marginHorizontal: 8,
      color: colors.black,
      fontWeight: '400',
      textAlign: 'center',
    },
    listitems: {
      marginBottom: 40,
    },
  });

  const handleOnSwipeRight = (username: string) => {
    if (userAccount.is_premium) {
      console.log('====================================');
      console.log(userAccount.is_premium);
      console.log('====================================');
      // matchauserRightSwipe(username);
      return;
    }
    if (swipeCount === maxSwipeCount) {
      setModalIsVisible(true);
      undoSwipe('Right');
      return;
    }
  };

  const LastCard = () => {
    return (
      <View>
        <Image source={FinalCard} style={styles.lastcontainer} />
      </View>
    );
  };
  return (
    <>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="light-content"
        />
        <ImageBackground
          source={require('../../assets/images/homeheader.png')}
          style={styles.backgroundimage}>
          {/* <View style={styles.notificationcontainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('matches')}
              style={styles.notificationHolder}
            >
              <Love />

              <Text style={styles.description}>You have 3 new matches!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('chat')}
              style={styles.notificationHolder}
            >
              <Bullble />

              <Text style={styles.description}>You have 3 new messages!</Text>
            </TouchableOpacity>
          </View> */}

          <View>
            <Text
              style={{fontWeight: 'bold', fontSize: 20, color: colors.white}}>
              Welcome to Bantu singles
            </Text>
          </View>
        </ImageBackground>

        <Text style={styles.dayspick}>Today’s picks</Text>

        {isLoading ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 400,
            }}>
            <AnimatedLottieView
              loop={true}
              autoPlay={true}
              style={{height: 60}}
              source={require('src/assets/lottie/circleloadingprogressindicator.json')}
            />
          </View>
        ) : (
          <>
            <CardStack
              style={styles.content}
              ref={swiper => {
                swiperInstance.current = swiper;
              }}
              onSwipedRight={e => {
                if (!Helpers.isEmpty(remotedata)) {
                  handleOnSwipeRight(remotedata[e].username);
                }
              }}
              onSwipeStart={() => console.log('startes')}
              onSwipedLeft={() => console.log('startes left')}
              onSwipedAll={handleUpdateCard}
              renderNoMoreCards={() => {
                return <LastCard />;
              }}>
              {remotedata &&
                remotedata.map((item: ExploreMatch) => {
                  return (
                    <Card style={styles.card} key={item.id}>
                      <ImageBackground
                        style={styles.cardviewcontainer}
                        source={{uri: item.default_image}}>
                        <View style={styles.directionholder}>
                          <Direction />
                          <Text style={styles.directiontext}>
                            {`${item?.distance || 0} away`}
                          </Text>
                        </View>

                        <View style={styles.nameagecontainer}>
                          <View>
                            <Text style={styles.nametext}>{item.username}</Text>
                            <Text style={styles.agetext}>{item.age}</Text>
                          </View>

                          <TouchableOpacity
                            style={styles.dot}
                            onPress={() => navigation.navigate('userdetails')}>
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
                }}>
                <Rewind />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancel}
                onPress={() => {
                  swiperInstance.current.swipeLeft();
                  setundoType('Left');
                }}>
                <CloseIcon />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  swiperInstance.current.swipeTop();
                  setundoType('Top');
                }}
                style={styles.heartsbutton}>
                <Hearts />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  swiperInstance.current.swipeRight();
                  setundoType('Right');
                }}
                style={styles.smileButton}>
                <Smiles />
              </TouchableOpacity>
            </View>
          </>
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate('pricestack')}
          style={styles.suboverall}>
          <Fire />
          <View style={styles.subscribecontainer}>
            <Text style={styles.subscribetext}>
              Subscribe to get more top picks, rewinds, and more!
            </Text>
          </View>
          <TouchableOpacity style={styles.checkitouttouchable}>
            <Text style={styles.checkitout}>Check it out →</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        width={'95%'}
        swipeThreshold={200} // default 100
        onTouchOutside={() => {
          setModalIsVisible(false);
        }}>
        <ModalContent>
          <View style={styles.toplayout}>
            <Whatshotbig />
            <Text style={styles.modaldescription}>Upgrade to Gold</Text>
          </View>

          <View style={styles.listitems}>
            <CancelingItem
              title={'Rewind to profiles you already rated'}
              icon={<Rewind />}
            />
            <CancelingItem
              title={'Chat with no limitations'}
              icon={<Inclusive />}
            />
            <CancelingItem
              title={'Enhance your profile’s privacy'}
              icon={<Schedule />}
            />
            <CancelingItem
              title={'Shine with more photos & videos'}
              icon={<Inclusive />}
            />
            <CancelingItem
              title={'Create better connections'}
              icon={<Heart />}
            />
          </View>

          <Button
            onPress={() => {
              setModalIsVisible(false);
              navigation.navigate('pricestack');
            }}>
            View Plans
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
}

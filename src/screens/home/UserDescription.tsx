import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Platform,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Text from 'src/components/Text';
import {Modal, ModalContent} from 'react-native-modals';

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

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
export default function UserDescription({navigation}) {
  const {colors} = useThemeStyles();
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const styles = StyleSheet.create({
    imagebackground: {
      width: '100%',
      height: 300,
      paddingTop: 32,
    },
    iconRight: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      borderRadius: 30,
      backgroundColor: colors.warning,
      marginBottom: 8,
    },
    bottomcontainer: {
      flexGrow: 1,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      marginTop: -32,
      backgroundColor: colors.white,
    },
    scrollview: {
      flexGrow: 1,
      paddingVertical: 16,
    },
    barcontainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: StatusBar.currentHeight,
      padding: 16,
    },
    name: {
      fontSize: 32,
      lineHeight: 39,
      color: colors.black,
      fontWeight: '600',
    },
    chatstyle: {
      backgroundColor: colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    directioncontainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    directionstyles: {fontSize: 12, marginLeft: 16},
    abountcontainer: {
      marginVertical: 16,
      paddingHorizontal: 16,
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
    moreaboutdescription: {fontSize: 16, lineHeight: 19, color: colors.black},
  });

  const ButtonItem = (icon: JSX.Element, title: string) => (
    <TouchableOpacity style={styles.touch}>
      <Musicnote />
      <Text style={styles.touchtitle}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <ImageBackground
        style={styles.imagebackground}
        source={require('src/assets/images/irene.png')}>
        <StatusBar barStyle="light-content" />
        <View style={styles.barcontainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowBack />
          </TouchableOpacity>
          <View>
            <TouchableOpacity style={styles.iconRight} onPress={() => {}}>
              <Text style={{color: 'white'}}>Me</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconRight} onPress={() => {}}>
              <Text style={{color: 'white'}}>Me</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.bottomcontainer}>
        <ScrollView style={styles.scrollview}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
            }}>
            <Text style={styles.name}>Irene 22</Text>
            <TouchableOpacity style={styles.chatstyle}>
              <Chat />
            </TouchableOpacity>
          </View>

          <View style={styles.directioncontainer}>
            <Direction />
            <Text style={styles.directionstyles}>16 miles away</Text>
          </View>

          <View style={styles.abountcontainer}>
            <Text style={styles.about}>About</Text>
            <Text style={styles.description}>
              I’m single and 22 years old. I love design, travelling, and going
              out to play. You can find me in Nairobi trying out local
              restaurants.
            </Text>
          </View>

          <View style={styles.abountcontainer}>
            <Text style={styles.about}>I love</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.touch}>
                <Musicnote />
                <Text style={styles.touchtitle}>Arts & Music</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.touch}>
                <Fashion />
                <Text style={styles.touchtitle}>Fashion</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.touch}>
                <BirthDayCake />
                <Text style={styles.touchtitle}>Food & Drink</Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.touch}>
                <PaintPrimary />
                <Text style={styles.touchtitle}>Painting</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.touch}>
                <Foodiconprimaty />
                <Text style={styles.touchtitle}>Travel & Places</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              padding: 16,
            }}>
            <Text style={styles.moreabout}>More about me</Text>
            <Text style={styles.moreaboutdescription}>Ethnicity: Gusii</Text>
          </View>

          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 70,
              borderTopWidth: 2,
              marginTop: 16,
              borderColor: colors.snow,
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: colors.snow,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 16,
                height: 56,
                flexDirection: 'row',
                borderRadius: 28,
              }}>
              <Close />
              <Text
                style={{
                  marginLeft: 16,
                  fontSize: 14,
                  lineHeight: 17,
                  color: colors.black,
                  fontWeight: '600',
                }}>
                Unmatch
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalIsVisible(true)}
              style={{
                flex: 1,
                backgroundColor: '#FFF2F2',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 16,
                height: 56,
                borderRadius: 28,
                flexDirection: 'row',
              }}>
              <Block />
              <Text
                style={{
                  marginLeft: 16,
                  fontSize: 14,
                  lineHeight: 17,
                  color: colors.danger,
                  fontWeight: '600',
                }}>
                Block
              </Text>
            </TouchableOpacity>
          </View>

          <Modal
            visible={modalIsVisible}
            width={'95%'}
            swipeThreshold={200} // default 100
            onTouchOutside={() => {
              setModalIsVisible(false);
            }}>
            <ModalContent>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginHorizontal: 30,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    lineHeight: 24,
                    fontWeight: '600',
                    color: colors.black,
                  }}>
                  Block Someone
                </Text>

                <TouchableOpacity onPress={() => setModalIsVisible(false)}>
                  <Close />
                </TouchableOpacity>
              </View>

              <View>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19.44,
                    margin: 30,
                    color: colors.black,
                    fontWeight: '400',
                  }}>
                  Would you like to tell us why you’d like to block this person?
                  This will help us create safer interactions for you on the
                  app.
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setModalIsVisible(false)}
                style={{
                  backgroundColor: '#FFF2F2',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 56,
                  borderRadius: 28,
                  flexDirection: 'row',
                }}>
                <Block />
                <Text
                  style={{
                    marginLeft: 8,
                    fontSize: 14,
                    lineHeight: 17,
                    color: colors.danger,
                    fontWeight: '600',
                  }}>
                  Block
                </Text>
              </TouchableOpacity>
            </ModalContent>
          </Modal>
        </ScrollView>
      </View>
    </>
  );
}

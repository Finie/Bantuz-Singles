import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  StatusBar,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import background from 'src/assets/images/moneyheader.png';
import Text from 'src/components/Text';
import BackButton from 'src/assets/images/whiteback.svg';
import FireBlaze from 'src/assets/icons/fireblaze.svg';
import useThemeStyles from 'src/hooks/useThemeStyles';

import CancelingItem from 'src/components/CancelingItem';
import Rewind from 'src/assets/icons/modalrewind.svg';
import Inclusive from 'src/assets/icons/inclusive.svg';
import Schedule from 'src/assets/icons/schedule.svg'; //border.svg
import Heart from 'src/assets/icons/border.svg'; //
import PlanItem from 'src/components/view/PlanItem';
import Button from 'src/components/pressable/Button';

export default function PriceQuotation({navigation}) {
  const {colors} = useThemeStyles();
  const [active, setActive] = useState(1);

  const handleCreatePaymentRequest = () => {
    switch (active) {
      case 1:
        navigation.navigate('paymentSelectionMode', {
          data: 0,
        });
        break;
      case 2:
        navigation.navigate('paymentSelectionMode', {
          data: 300,
        });

        break;

      default:
        navigation.navigate('paymentSelectionMode', {
          data: 1000,
        });
    }
  };

  const styles = StyleSheet.create({
    imagebackground: {
      height: 270,
    },
    scroll: {
      flexGrow: 1,
      backgroundColor: colors.snow,
    },

    topview: {
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },

    fireblazeContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 190,
      marginHorizontal: 30,
    },
    textStyle: {
      color: colors.white,
      fontSize: 32,
      lineHeight: 38.88,
      fontWeight: '700',
      textAlign: 'center',
      marginVertical: 30,
    },
    afterbimage: {
      backgroundColor: colors.white,
    },

    meetingtext: {
      fontSize: 20,
      lineHeight: 24,
      color: colors.black,
      fontWeight: '400',
      textAlign: 'center',
      marginHorizontal: 30,
      marginVertical: 40,
    },
    listitems: {
      marginBottom: 40,
    },
    contents: {
      height: 40,
      flexDirection: 'row',
    },
    buttonback: {
      padding: 8,
      justifyContent: 'center',
      marginLeft: 15,
    },
    pickplsntext: {
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: '600',
      fontSize: 20,
      lineHeight: 24,
      marginVertical: 30,
    },
    plaintext: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    palinitem: {
      flex: 1,
      padding: 16,
    },
    pickcontainer: {justifyContent: 'center', alignItems: 'center'},
    plaintextlast: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 6,
    },
    bottombutton: {
      marginHorizontal: 30,
    },
  });
  return (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <ImageBackground style={styles.imagebackground} source={background}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="light-content"
        />
        <SafeAreaView>
          <View style={styles.contents}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.buttonback}>
              <BackButton />
            </TouchableOpacity>
            <View style={styles.contents} />
          </View>
          <View style={styles.fireblazeContainer}>
            <FireBlaze />
            <Text style={styles.textStyle}>
              Upgrade to Bantuz Singles Plans
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>

      <View style={styles.pickcontainer}>
        <Text style={styles.pickplsntext}>Pick a Plan</Text>
      </View>

      <View style={styles.plaintext}>
        <View style={styles.palinitem}>
          <PlanItem
            index={1}
            active={active}
            priceperMonth={'Free'}
            total={'KSh 0.00'}
            months={'1'}
            onPress={() => setActive(1)}
          />
        </View>
        <View style={styles.palinitem}>
          <PlanItem
            index={2}
            active={active}
            priceperMonth={'Basic'}
            total={'KSh 300'}
            months={'3'}
            onPress={() => setActive(2)}
          />
        </View>
      </View>

      <View style={styles.plaintextlast}>
        <View style={styles.palinitem}>
          <PlanItem
            index={3}
            active={active}
            priceperMonth={'Premium'}
            total={'KSh 1000'}
            months={'6'}
            onPress={() => setActive(3)}
          />
        </View>
      </View>

      <View style={styles.afterbimage}>
        <Text style={styles.meetingtext}>
          What you get on{' '}
          {`${active === 1 ? 'free' : active === 2 ? 'basic' : 'Premium'}`}
        </Text>

        <View style={styles.listitems}>
          <CancelingItem
            title={`${
              active === 1
                ? '10 swipes a day'
                : active === 2
                ? '50 swipes a day'
                : 'Unlimited swipes'
            }`}
            icon={<Rewind />}
          />
          <CancelingItem
            title={`${
              active === 1
                ? 'Chat after you match with each other'
                : active === 2
                ? 'Chat after you match with each other'
                : 'Chat before & after you match with each other'
            }`}
            icon={<Inclusive />}
          />
          <CancelingItem
            title={`${
              active === 1
                ? '3 photos on your profile'
                : active === 2
                ? '4 photos & 1 video on your profile'
                : '4 photos & 2 videos on your profile'
            }`}
            icon={<Schedule />}
          />
          <CancelingItem
            title={`${
              active === 1
                ? 'See who likes you only after you match'
                : active === 2
                ? 'See who likes you only after you match'
                : 'See who likes you before you match'
            }`}
            icon={<Inclusive />}
          />
        </View>

        <View style={styles.bottombutton}>
          <Button
            type={active === 1 ? 'disabled' : 'primary'}
            onPress={handleCreatePaymentRequest}
            style={styles.bottomButton}>
            {'Confirm Subscription'}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

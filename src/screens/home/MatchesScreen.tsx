import {
  View,
  ImageBackground,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import useThemeStyles from 'src/hooks/useThemeStyles';
import Outline from 'src/assets/icons/loveoutline.svg';
import Text from 'src/components/Text';
import FloatingLabelInput from 'src/components/FloatingLabelInput';
import MatchItem from 'src/components/view/MatchItem';
import homeRouter from 'src/api/routers/homeRouter';
import AnimatedLottieView from 'lottie-react-native';
import Helpers from 'src/Helpers';
import {VerticalMapList} from 'src/components/view/VerticalMapList';
import NoDatatDisplay from 'src/components/view/NoDatatDisplay';

export default function MatchesScreen({navigation}) {
  const {colors} = useThemeStyles();
  const [isLoading, setIsloading] = useState(false);
  const [is404Error, setis404Error] = useState('');

  const [matchData, setMatchData] = useState([]);

  const fetchMatches = async () => {
    const request = {page: 1, pagesize: 10};
    setIsloading(true);
    const response = await homeRouter.findMyMatches(request);
    setIsloading(false);

    if (response.ok) {
      setMatchData(response.data.data.data);
      console.log('====================================');
      console.log(JSON.stringify(response.data.data.data));
      console.log('====================================');
      return;
    }

    if (response.status === 404) {
      setis404Error(response.data.message);
      return;
    }

    console.log('====================================');
    console.log(response.data);
    console.log('====================================');
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.white,
    },
    backgroundimage: {
      width: '100%',
      height: 200,
      alignItems: 'center',
      paddingTop: 40,
    },
    matches: {
      fontSize: 32,
      lineHeight: 39,
      color: colors.white,
      fontWeight: '700',
      marginVertical: 16,
    },
    matchesdescription: {
      fontSize: 12,
      lineHeight: 15,
      textAlign: 'center',
      marginHorizontal: 80,
      color: colors.white,
    },
    floatview: {
      marginHorizontal: 30,
    },
    scrollflex: {
      flexGrow: 1,
    },
    loaderstyle: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  });
  return (
    <ScrollView
      contentContainerStyle={styles.scrollflex}
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require('../../assets/images/homeheader.png')}
        style={styles.backgroundimage}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="light-content"
        />
        <Outline />

        <Text style={styles.matches}>Matches</Text>
        <Text style={styles.matchesdescription}>
          You matched profiles. You liked each other. Now take it to the next
          level.
        </Text>
      </ImageBackground>
      <View style={styles.floatview}>
        <FloatingLabelInput label={'Search'} search />
      </View>

      {isLoading && (
        <View style={styles.loaderstyle}>
          <AnimatedLottieView
            autoPlay={true}
            loop={true}
            style={{height: 60}}
            source={require('src/assets/lottie/circleloadingprogressindicator.json')}
          />
        </View>
      )}

      {!Helpers.isEmpty(is404Error) && (
        <NoDatatDisplay
          mainHeader={'You don’t have any matches yet'}
          description={
            ' Make the first move. Swipe on profiles of people who you might match with.'
          }
          actiontext={'See Today’s Picks →'}
          onPress={function (): void {
            navigation.navigate('home');
          }}
        />
      )}

      <View style={{marginBottom: 60}}>
        <VerticalMapList
          data={matchData}
          renderItem={({item}) => (
            <MatchItem
              onPress={() =>
                navigation.navigate('messageUi', {data: item.swipe_b})
              }
              data={item.swipe_b}
            />
          )}
          ListHeaderComponent={undefined}
          ListHeaderComponentStyle={undefined}
          ListFooterComponent={undefined}
          ListFooterComponentStyle={undefined}
          ListEmptyComponent={undefined}
          style={undefined}
          horizontal={undefined}
          ItemSeparatorComponent={() => (
            <View style={{backgroundColor: colors.snow, height: 2}} />
          )}
          numColumns={undefined}
        />
      </View>
    </ScrollView>
  );
}

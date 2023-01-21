import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {SwipeListView} from 'react-native-swipe-list-view';
import Screen from 'src/components/screen/Screen';
import Text from 'src/components/Text';

import HumberButton from 'src/assets/icons/humberbutton.svg';
import FloatingLabelInput from 'src/components/FloatingLabelInput';
import ChatListItem from 'src/components/view/ChatListItem';
import Slideonr from 'src/assets/images/sliderone.png';
import Slidetwo from 'src/assets/images/slidethree.png';
import useThemeStyles from 'src/hooks/useThemeStyles';
import AnimatedLottieView from 'lottie-react-native';
import chatRouter from 'src/api/routers/chatRouter';
import Helpers from 'src/Helpers';
import NoDatatDisplay from 'src/components/view/NoDatatDisplay';
import EncryptionStore from 'src/data/EncryptionStore';

export default function ChatHome({navigation}) {
  const {colors} = useThemeStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setdata] = useState([] as any);

  const [bearerToken, setBearerToken] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchChatrooms = async () => {
      setIsLoading(true);
      const response = await chatRouter.getMessageChatRooms();
      setIsLoading(false);

      if (response.ok) {
        setdata(response.data.data.data);
        
        return;
      }
    };

    const getauthtoken = async () => {
      const response = await EncryptionStore.getUserToken();
      const userdat = await EncryptionStore.retrieveBantuUser();

      if (Helpers.isEmpty(response)) {
        return null;
      }

      setUserName(userdat.username);
      setBearerToken(response);
      return JSON.stringify(response);
    };
    getauthtoken();
    fetchChatrooms();
  }, []);

  const styles = StyleSheet.create({
    viewitem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 30,
    },
    search: {
      marginHorizontal: 20,
    },
    flatlistContainer: {
      backgroundColor: colors.white,
      flexGrow: 1,
    },
    flatList: {},

    safearea: {
      // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      paddingTop: 40,
      flexGrow: 1,
    },
    bottom: {
      marginBottom: 100,
      backgroundColor: colors.white,
    },
    separator: {
      height: 1,
      backgroundColor: colors.snow,
    },
    alignment: {justifyContent: 'center', alignItems: 'center', flex: 1},
    lottie: {
      height: 60,
    },
    chatrooms: {
      marginTop: 16,
    },
  });

  const _headerComponent = () => {
    return (
      <SafeAreaView style={styles.safearea}>
        <View style={styles.viewitem}>
          <Text>Chat</Text>

          <TouchableOpacity>
            <HumberButton />
          </TouchableOpacity>
        </View>

        <View style={styles.search}>
          <FloatingLabelInput
            onChangeText={text => console.log(text)}
            onBlur={() => console.log}
            label="Search"
            search
          />
        </View>

        {Helpers.isEmpty(data) && (
          <NoDatatDisplay
            mainHeader={'You don’t have any chats yet'}
            description={
              'Make the first move. Send a message to someone you’ve matched with and get the conversation going.'
            }
            actiontext={'See Your Matches →'}
            onPress={function (): void {
              navigation.navigate('matches');
            }}
          />
        )}
      </SafeAreaView>
    );
  };
  const Separator = () => {
    return <View style={styles.separator} />;
  };
  const _Footer = () => <View style={styles.bottom} />;
  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      {isLoading ? (
        <View style={styles.alignment}>
          <AnimatedLottieView
            loop={true}
            autoPlay={true}
            style={styles.lottie}
            source={require('src/assets/lottie/circleloadingprogressindicator.json')}
          />
          <Text style={styles.chatrooms}>Loading chatrooms...</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          contentContainerStyle={styles.flatlistContainer}
          ListHeaderComponent={_headerComponent}
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) =>
            index + item.conversation_id.toString()
          }
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({item, index}) => (
            <ChatListItem
              data={item}
              index={index}
              onClick={() =>
                navigation.navigate('messageUi', {
                  data: item,
                  token: bearerToken,
                  usename: userName,
                })
              }
            />
          )}
          ListFooterComponent={_Footer}
        />
      )}
    </>
  );
}

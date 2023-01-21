import {View, StyleSheet, TextInput, ScrollView, FlatList} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';

import {useIsFocused} from '@react-navigation/native';

import {CompatClient, Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import ChatScreen from 'src/components/screen/ChatScreen';
import CurrentUserFirstBubble from 'src/components/view/CurrentUserFirstBubble';
import CurrentUserSecondBubble from 'src/components/view/CurrentUserSecondBubble';
import OtherUserFirstBubble from 'src/components/view/OtherUserFirstBubble';
import OtherUserSecondBubble from 'src/components/view/OtherUserSecondBubble';
import useThemeStyles from 'src/hooks/useThemeStyles';

import SendIcon from 'src/assets/icons/sendicon.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MessageItem, UserMatchType} from 'src/utils/shared.types';
import Helpers from 'src/Helpers';
import AnimatedLottieView from 'lottie-react-native';
import Text from 'src/components/Text';
import BaseContextProvider from 'src/context/BaseContextProvider';
import EncryptionStore from 'src/data/EncryptionStore';
import chatRouter from 'src/api/routers/chatRouter';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Chat} from 'src/screens/chat';

// let stompClient: CompatClient | null = null;

const baseUrl = 'http://165.22.28.94';

export default function ChatRoom({navigation, route}) {
  const {data, token, usename} = route.params;
  const [bearerToken, setBearerToken] = useState(token);
  const [userName, setUserName] = useState(usename);
  const [isConnected, setisConnected] = useState(false);
  const [isdataAdded, setIsdataAdded] = useState(false);
  const {colors} = useThemeStyles();

  const [thread, setThread] = useState([] as any);
  const isFocused = useIsFocused();

  const {userData} = useContext(BaseContextProvider);
  const user = {id: userName};

  // const updateData = useCallback(() => {
  //   console.log(
  //     '====================================\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
  //   );
  //   console.log(thread);
  //   console.log(
  //     '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n====================================',
  //   );
  //   setThread(thread);

  //   return thread;
  // }, []);

  const [receiver, setReceiver] = useState('');

  const userInfo: UserMatchType = data;

  const header = {
    Authorization: 'Bearer ' + bearerToken,
    'App-ID': 1,
  };

  var socket = new SockJS(baseUrl + '/chat-ws');
  const stompClient = Stomp.over(socket);
  stompClient.configure({
    reconnectDelay: 5000,
  });
  stompClient.connect(header, onConnected, onError);

  useEffect(() => {
    if (!isFocused) {
      stompClient.disconnect();
    }
  }, [isFocused]);

  function onConnected(data: any) {
    // console.log('====================================');
    // console.log('is now connected :::::: ', data);
    // console.log('is now connected :::::: ', '/user/' + userName + '/private');
    // console.log('is now connected :::::: ', onMessageReceived);
    // console.log('====================================');

    //Subscribe to private
    stompClient?.subscribe('/user/' + userName + '/private', onMessageReceived);

    //Subscribe to errors
    stompClient?.subscribe('/queue/errors', onErrorReceived);

    //Tell your username to the server
    stompClient?.send(
      '/api/message',
      header,
      JSON.stringify({sender: userName, type: 'JOIN'}),
    );

    setisConnected(true);
  }

  function onError(error: any) {
    console.log('====================================');
    console.log(error);
    console.log(
      'Could not connect to WebSocket server. Please refresh this page to try again!',
    );
    console.log('====================================');
  }

  function onErrorReceived(payload: {body: any}) {
    console.log(payload.body);
  }

  async function onMessageReceived(payload: {body: string}) {
    const message = JSON.parse(payload.body);

    fetchChalog();

    // setThread((thread: any) => {
    //   thread.push(message);
    //   return [...thread];
    // });
  }

  const sendMessage = (messageitem: string) => {
    if (messageitem !== '') {
      const chatMessage = {
        sender: userName,
        receiver: userInfo.user.username,
        content: messageitem,
        type: 'CHAT',
        time: new Date(Date.now()),
      };

      stompClient?.send(
        '/api/private-message',
        header,
        JSON.stringify(chatMessage),
      );

      const messageRequest: MessageItem = {
        content: messageitem,
        created_on: `${new Date(Date.now())}`,
        id: 0,
        sender: userName,
      };

      fetchChalog();

      // setThread([messageRequest, ...thread]);

      // setThread((thread: any) => {
      //   thread.push(messageRequest);
      //   return [...thread];
      // });
    }
  };

  const fetchChalog = async () => {
    const response = await chatRouter.getIndividualMessages(
      data.user.username,
      1,
      100,
    );

    if (response.ok) {
      // console.log('====================================');
      // console.log(response.data.data);
      // console.log('====================================');

      setThread(response.data.data);
    }

    // console.log('====================================');
    // console.log(response);
    // console.log('====================================');
  };

  useEffect(() => {
    fetchChalog();
  }, []);

  useEffect(() => {
    setIsdataAdded(!isdataAdded);
  }, [thread.length]);

  return (
    <ChatScreen
      image={data?.image || ''}
      isheaderVisible
      onBackPress={() => navigation.goBack()}
      title={`${userInfo.user.first_name} ${userInfo.user.last_name}`}>
      <SafeAreaProvider>
        <Chat
          messages={isdataAdded ? thread : thread}
          user={user}
          onSendPress={message => sendMessage(message.text)}
        />
      </SafeAreaProvider>
    </ChatScreen>
  );
}

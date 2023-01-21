import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import Text from './Text';
import {launchImageLibrary} from 'react-native-image-picker';
import mime from 'mime';
import useThemeStyles from 'src/hooks/useThemeStyles';
import Video from 'react-native-video';
// import {AnySizeDragSortableView} from 'react-native-drag-sort';
import Modal, {
  ModalContent,
  SlideAnimation,
  ScaleAnimation,
  BottomModal,
  ModalPortal,
} from 'react-native-modals';

import CameraActive from 'src/assets/icons/cameraactive.svg';
import FloatingLabelInput from './FloatingLabelInput';
import DropDwon from './DropDwon';

import CloseSelected from 'src/assets/icons/closeimageselected.svg'; //
import PassionItem from './PassionItem';
import Button from './pressable/Button';
import Helpers from 'src/Helpers';
import authRouter from 'src/api/routers/authRouter';
import BaseContextProvider from 'src/context/BaseContextProvider';
import {UserProfile} from 'src/utils/shared.types';
import {VerticalMapList} from './view/VerticalMapList';
import TextareaInput from './forms/TextareaInput';
import homeRouter from 'src/api/routers/homeRouter';
import VideoIcon from 'src/assets/icons/imageactive.svg';

const EditAboutMe = () => {
  const {colors} = useThemeStyles();

  const [isLoading, setIsloading] = useState(false);
  const [isOthersFetching, setisOthersFetching] = useState(false);
  const [passionLoading, setPassionLoading] = useState(false);
  const [image1uri, setImage1uri] = useState('' as string | undefined | null);
  const [dataMore, setdataMore] = useState([]);
  const [passion, setPassion] = useState([]);

  const windowWidt = Dimensions.get('window').width;

  const windowWidh = windowWidt / 3;
  const windowWidth = windowWidh - 18;
  // const windowHeight = Dimensions.get('window').height;
  const [bottomModalAndTitle, setbottomModalAndTitle] =
    useState<boolean>(false);

  const {userData} = useContext(BaseContextProvider);

  const userProfile: UserProfile = userData;

  const photoLength = userProfile.profile.media.length;

  var photoPosition = 0;

  const fetchPassions = async () => {
    setPassionLoading(true);
    const response = await authRouter.fetchPassions();
    setPassionLoading(false);

    if (response.ok) {
      setPassion(response.data.data);
      return;
    }

    console.log('====================================');
    console.log(response);
    console.log('====================================');
  };

  const fetchOtherData = async () => {
    setisOthersFetching(true);
    const response = await authRouter.fetchOtherPersions();
    setisOthersFetching(false);

    if (response.ok) {
      setdataMore(response.data.data);
      return;
    }
  };

  const fetchLanguages = async () => {
    const response = await authRouter.fetchLanguages();

    if (response.ok) {
      setLanguage(response.data.data);
      return;
    }

    console.log('====================================');
    console.log(response);
    console.log('====================================');
  };

  const pickImageFromGalary = async () => {
    setbottomModalAndTitle(false);

    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
      });
      const response = {
        status: 'success',
        base64: result.assets[0].base64,
        uri: result.assets[0].uri,
      };

      return response;
    } catch (error) {
      const response = {
        status: 'error',
        base64: null,
        uri: null,
        error: error,
      };

      return response;
    }
  };

  const pickVideoFromGalary = async () => {
    setbottomModalAndTitle(false);
    try {
      const result = await launchImageLibrary({
        mediaType: 'video',
        includeBase64: true,
      });
      const response = {
        status: 'success',
        base64: result.assets[0].base64,
        uri: result.assets[0].uri,
      };

      return response;
    } catch (error) {
      const response = {
        status: 'error',
        base64: null,
        uri: null,
        error: error,
      };

      return response;
    }
  };

  const handleGetImage = async () => {
    const {status, uri, base64} = await pickImageFromGalary();
    if (status === 'success') {
      setImage1uri(uri);
      const imageReques = {
        encoded_file: `data:${mime.getType(
          uri?.split('/').pop() || 'image/png',
        )};base64,${base64}`,
        name: uri?.split('/').pop() || 'photo',
        type: 'PHOTO',
        is_default: false,
      };

      setIsloading(true);
      const response = await homeRouter.updateProfilePic(imageReques);
      setIsloading(false);

      if (response.ok) {
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');

        return;
      }

      console.log('====================================');
      console.log(response.data);
      console.log('====================================');
    }
  };

  const handleUserUpdateinfo = async () => {};

  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderItem = (props: {
    url: any;
    handleGetImage: any;
    key: any;
    type: any;
    onLongPress: any;
    onPressOut: any;
  }) => {
    const {url, handleGetImage, key, type, onLongPress, onPressOut} = props;

    return (
      <>
        <View key={key} style={styles.imageholders}>
          {Helpers.isEmpty(url) ? (
            <>
              <CameraActive />
            </>
          ) : (
            <ImageBackground
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                height: 142,
                width: windowWidth,
                alignItems: 'flex-end',
              }}
              source={{uri: url}}>
              <TouchableOpacity onPress={() => setImage1uri('')}>
                <CloseSelected />
              </TouchableOpacity>
            </ImageBackground>
          )}
        </View>
      </>
    );
  };

  const styles = StyleSheet.create({
    photo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 30,
      marginTop: 32,
    },
    imagePickerContainer: {
      marginHorizontal: 30,
    },
    imageholders: {
      height: 142,
      backgroundColor: colors.snow,
      margin: 3,
      // flexDirection: 'row',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      width: windowWidth,
    },
    imageholdercontainer: {
      // height: 200,
      flexDirection: 'row',
      marginTop: 15,
    },
    scroll: {
      flexGrow: 1,
    },
    biosection: {
      margin: 30,
    },

    holder: {
      borderWidth: 1,
      borderColor: colors.snow,
      borderRadius: 6,
      marginVertical: 40,
      marginHorizontal: 30,
    },
    gender: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 56,
      paddingHorizontal: 20,
    },
    gender2: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 56,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderColor: colors.snow,
    },
    genderitem: {
      marginLeft: 16,
    },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 16,
      backgroundColor: colors.snow,
      padding: 5,
      borderRadius: 10,
    },
    mustpick: {marginLeft: 16, fontSize: 12, lineHeight: 14},

    passioniteholder: {
      marginVertical: 5,
      flexDirection: 'row',
    },
    passionholder: {
      marginTop: 16,
    },
    passionname: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '600',
      color: colors.black,
      marginVertical: 20,
    },
    passion: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '600',
      color: colors.black,
    },
    lastbutton: {
      marginHorizontal: 30,
      marginBottom: 60,
    },
  });

  const sortableViewRef = useRef();

  const handleLongPress = ({item, index}) => {
    sortableViewRef.current.startTouch(item, index);
  };
  const handleLongPressOut = ({item, index}) => {
    sortableViewRef.current.onPressOut();
  };
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.photo}>
        <Text>Photo</Text>
        <Text>Drag to reorder</Text>
      </View>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.passionholder}>
          <VerticalMapList
            data={userProfile.profile.media}
            renderItem={(
              item: {
                path: string;
                type: string; // 'PHOTO' | 'Video';
                is_default: boolean;
              },
              index: number,
            ) => {
              photoPosition++;

              return photoPosition === photoLength ? (
                <TouchableOpacity
                  onPress={() => setbottomModalAndTitle(true)}
                  style={styles.imageholders}>
                  <CameraActive />
                  <Text style={{marginTop: 6}}>Add file</Text>
                </TouchableOpacity>
              ) : (
                <RenderItem
                  key={index}
                  type={item.item.type}
                  url={item.item.path}
                  onLongPress={handleLongPress}
                  onPressOut={handleLongPressOut}
                  handleGetImage={() => {
                    handleGetImage(index);
                  }}
                />
              );
            }}
            numColumns={3}
          />
        </View>
        {/* <AnySizeDragSortableView
          ref={sortableViewRef}
          dataSource={userProfile.profile.media}
          keyExtractor={item => item.id} // 1、isRequired
          renderItem={(
            item: {
              path: string;
              type: string; // 'PHOTO' | 'Video';
              is_default: boolean;
            },
            index,
          ) => {
            return (
              <RenderItem
                key={index}
                type={item.type}
                url={item.path}
                onLongPress={handleLongPress}
                onPressOut={handleLongPressOut}
                handleGetImage={() => {
                  console.log('====================================');
                  console.log(index);
                  console.log('====================================');

                  handleGetImage(index);
                }}
              />
            );
          }}
          onDataChange={(data, callback) => {
            setMedia(data);
            console.log('====================================');
            console.log(data);
            console.log('====================================');
          }}
        /> */}
      </View>
      <View style={styles.biosection}>
        <Text>Bio</Text>

        <FloatingLabelInput
          onBlur={() => console.log()}
          onChangeText={() => console.log()}
          label="First name"
          textValue={userProfile.first_name}
        />
        <FloatingLabelInput
          onBlur={() => console.log()}
          onChangeText={() => console.log()}
          label="Last name"
          textValue={userProfile.last_name}
        />
        <FloatingLabelInput
          onBlur={() => console.log()}
          onChangeText={() => console.log()}
          label="Birthday"
          textValue={userProfile.profile.birth_date}
        />
        <FloatingLabelInput
          onBlur={() => console.log()}
          onChangeText={() => console.log()}
          label="Gender"
          textValue={userProfile.profile.gender}
        />
        <FloatingLabelInput
          onBlur={() => console.log()}
          onChangeText={() => console.log()}
          label="I live in"
          textValue={userProfile.profile.location.name}
        />
        <TextareaInput
          onBlur={() => console.log()}
          onChangeText={() => console.log()}
          placeholder="Describe yourself"
          multiline={true}
          numberOfLines={10}
          textValue={userProfile.profile.bio.bio}
          // style={{
          //   paddingTop: 10,
          //   textAlignVertical: 'center',
          // }}
        />
        <FloatingLabelInput
          onBlur={() => console.log()}
          onChangeText={() => console.log()}
          label="What are you looking for?"
          textValue={userProfile.profile.bio.looking_for}
        />
        <FloatingLabelInput
          label="Height"
          onBlur={() => console.log()}
          onChangeText={() => console.log()}
          textValue={userProfile.profile.height}
        />
        <DropDwon
          title={'Weight'}
          description={userProfile.profile.physical_frame}
        />
      </View>
      <View style={styles.biosection}>
        <Text>More</Text>

        <FloatingLabelInput
          onBlur={() => console.log()}
          onChangeText={() => console.log()}
          label="Which languages do you speak?"
          textValue={userProfile.profile.bio.languages[0]?.name || 'N/A'}
        />
        <DropDwon title={'Education Level'} description={'Master’s Degree'} />
        <FloatingLabelInput
          onBlur={() => console.log()}
          onChangeText={() => console.log()}
          label="Occupation"
        />
        <DropDwon title={'Religion'} description={'I prefer not to say'} />
      </View>
      <View style={styles.biosection}>
        <Text style={styles.passion}>Passions</Text>

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
      <View style={styles.lastbutton}>
        <Button onPress={handleUserUpdateinfo}>Save</Button>
      </View>
      {/* eslint-disable-next-line react/self-closing-comp */}
      <BottomModal
        visible={bottomModalAndTitle}
        onTouchOutside={() => setbottomModalAndTitle(false)}
        height={0.2}
        width={1}
        onSwipeOut={() => setbottomModalAndTitle(false)}>
        <View style={{margin: 16}}>
          <Text style={{fontSize: 20, lineHeight: 22, color: colors.silver}}>
            Select file
          </Text>

          <TouchableOpacity
            onPress={pickImageFromGalary}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              marginVertical: 8,
              alignItems: 'center',
              flexDirection: 'row',
              marginHorizontal: 4,
            }}>
            <VideoIcon />

            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                fontSize: 18,
                lineHeight: 22,
                marginHorizontal: 8,
                color: colors.black,
              }}>
              Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              marginVertical: 8,
              alignItems: 'center',
              flexDirection: 'row',
            }}
            onPress={pickVideoFromGalary}>
            <CameraActive />

            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                fontSize: 18,
                lineHeight: 22,
                marginHorizontal: 8,
                color: colors.black,
              }}>
              Video
            </Text>
          </TouchableOpacity>
        </View>
      </BottomModal>
    </ScrollView>
  );
};

export default EditAboutMe;

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';
import {launchImageLibrary} from 'react-native-image-picker';
import mime from 'mime';
import {Image as Imagecompressor} from 'react-native-compressor';
import RNFS from 'react-native-fs';

import AuthScreen from 'src/components/screen/AuthScreen';
import Text from 'src/components/Text';
import AppForm from 'src/components/forms/AppForm';
import FabSubmit from 'src/components/forms/FabSubmit';
import useThemeStyles from 'src/hooks/useThemeStyles';

import CameraActive from 'src/assets/icons/cameraactive.svg';
import CameraInActive from 'src/assets/icons/imageactive.svg';
import InactiveImage from 'src/assets/icons/inactiveImage.svg'; //closeimageselected.svg
import CloseSelected from 'src/assets/icons/closeimageselected.svg'; //
import InactiveRecord from 'src/assets/icons/inactiveRecord.svg'; //
import FloatingButton from 'src/components/FloatingButton';
import Helpers from 'src/Helpers';
import {UserProfile} from 'src/utils/shared.types';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email()
    .label('Email'),
});

export default function Personalityphotos({navigation, route}) {
  const {colors} = useThemeStyles();
  const [ischecked, setisChecked] = useState(false);
  const [image1uri, setImage1uri] = useState('' as string | undefined | null);
  const [image2uri, setImage2uri] = useState('' as string | undefined | null);
  const [image3uri, setImage3uri] = useState('' as string | undefined | null);
  const [imageArray, setImageArray] = useState([] as any);

  const UserInfo: UserProfile = route.params.data;

  const handleSumbit = () => {
    const request = {
      first_name: UserInfo.first_name,
      email: UserInfo.email,
      last_name: UserInfo.last_name,
      password: UserInfo.password,
      middle_name: UserInfo.middle_name,
      phone: UserInfo.phone,
      username: UserInfo.username,
      profile: {
        birth_date: UserInfo.profile.birth_date,
        gender: UserInfo.profile.gender,
        height: UserInfo.profile.height,
        physical_frame: UserInfo.profile.physical_frame,
        ethnicity: UserInfo.profile.ethnicity,
        location: {
          google_place_id: 'string',
          name: 'string',
          longitude: UserInfo.profile.location.longitude,
          latitude: UserInfo.profile.location.latitude,
        },
        media: imageArray,
      },
    };

    navigation.navigate('interestScreen', {data: request});
  };

  const pickImageFromGalary = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
      });

      const compressed_result = await Imagecompressor.compress(
        result.assets[0]?.uri,
        {
          maxWidth: 1280,
          quality: 0.8,
        },
      );

      const conversion_response = await RNFS.readFile(
        compressed_result,
        'base64',
      );

      const response = {
        status: 'success',
        base64: conversion_response,
        uri: compressed_result,
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

  const handleGetImage = async (currentImage: number) => {
    switch (currentImage) {
      case 0:
        const {status, uri, base64} = await pickImageFromGalary();
        if (status === 'success') {
          setImage1uri(uri);
          const imageRequest = {
            encoded_file: `data:${mime.getType(uri)};base64,${base64}`,
            name: uri?.split('/').pop() || 'photo',
            type: 'PHOTO',
            is_default: true,
          };

          console.log('====================================');
          console.log(imageRequest);
          console.log('====================================');

          setImageArray([...imageArray, imageRequest]);
        }
        break;
      case 1:
        const {
          status: status1,
          uri: uri1,
          base64: base641,
        } = await pickImageFromGalary();
        if (status1 === 'success') {
          setImage2uri(uri1);
          const imageRequest = {
            encoded_file: `data:${mime.getType(uri1)};base64,${base641}`,
            name: uri1?.split('/').pop() || 'photo',
            type: 'PHOTO',
            is_default: false,
          };
          setImageArray([...imageArray, imageRequest]);
        }
        break;
      case 2:
        const {
          status: status2,
          uri: uri2,
          base64: base642,
        } = await pickImageFromGalary();
        if (status2 === 'success') {
          setImage3uri(uri2);
          const imageRequest = {
            encoded_file: `data:${mime.getType(uri2)};base64,${base642}`,
            name: uri?.split('/').pop() || 'photo',
            type: 'PHOTO',
            is_default: false,
          };
          setImageArray([...imageArray, imageRequest]);
        }
        break;
    }

    setisChecked(!ischecked);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
    },

    howtwxt: {
      fontWeight: '600',
      fontSize: 32,
      lineHeight: 39,
      color: colors.black,
    },
    sharetext: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 15,
    },
    bottomcontainer: {
      flexDirection: 'row',
      paddingVertical: 16,
      paddingHorizontal: 30,
    },
    emptychecjbox: {
      borderWidth: 2,
      borderColor: colors.silver,
      width: 20,
      height: 21,
      borderRadius: 4,
    },
    disclaimer: {
      flexDirection: 'row',
      flex: 2,
      alignItems: 'center',
    },
    discalimertext: {
      marginLeft: 15,
      fontSize: 12,
      lineHeight: 14,
    },
    discalimertext2: {
      fontSize: 12,
      lineHeight: 14,
      marginTop: 20,
      color: colors.black,
    },
    fabcontainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    imageholders: {
      height: 142,
      flex: 1,
      backgroundColor: colors.snow,
      margin: 3,
      flexDirection: 'row',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    viewimageholders: {
      height: 142,
      flex: 1,
      backgroundColor: colors.snow,
      margin: 3,
      borderRadius: 10,
      overflow: 'hidden',
    },
    imageholdercontainer: {
      // height: 200,
      flexDirection: 'row',
      marginTop: 15,
    },
  });
  return (
    <AuthScreen
      onBackPressed={function(): void {
        navigation.goBack();
      }}
    >
      <AppForm
        initialValues={{
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSumbit}
      >
        <View style={styles.container}>
          <Text style={styles.howtwxt}>
            Show your personality with photos & videos
          </Text>
          <Text style={styles.discalimertext2}>
            Give people a better sense of who you are with photos and videos.
          </Text>

          <View style={styles.imageholdercontainer}>
            <TouchableOpacity
              onPress={() => handleGetImage(0)}
              style={styles.imageholders}
            >
              {Helpers.isEmpty(image1uri) ? (
                <CameraActive />
              ) : (
                <ImageBackground
                  style={{height: 142, width: '100%', alignItems: 'flex-end'}}
                  source={{uri: image1uri}}
                >
                  <TouchableOpacity onPress={() => handleGetImage(0)}>
                    <CloseSelected />
                  </TouchableOpacity>
                </ImageBackground>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleGetImage(1)}
              style={styles.imageholders}
            >
              {Helpers.isEmpty(image2uri) ? (
                <CameraActive />
              ) : (
                <ImageBackground
                  style={{height: 142, width: '100%', alignItems: 'flex-end'}}
                  source={{uri: image2uri}}
                >
                  <TouchableOpacity onPress={() => handleGetImage(1)}>
                    <CloseSelected />
                  </TouchableOpacity>
                </ImageBackground>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleGetImage(2)}
              style={styles.imageholders}
            >
              {Helpers.isEmpty(image3uri) ? (
                <CameraActive />
              ) : (
                <ImageBackground
                  style={{height: 142, width: '100%', alignItems: 'flex-end'}}
                  source={{uri: image3uri}}
                >
                  <TouchableOpacity onPress={() => handleGetImage(2)}>
                    <CloseSelected />
                  </TouchableOpacity>
                </ImageBackground>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.imageholdercontainer}>
            <TouchableOpacity
              onPress={() => handleGetImage(3)}
              style={styles.imageholders}
            >
              <InactiveImage />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleGetImage(4)}
              style={styles.imageholders}
            >
              <InactiveRecord />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleGetImage(5)}
              style={styles.imageholders}
            >
              <InactiveRecord />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomcontainer}>
          <View style={styles.disclaimer}>
            <Text style={styles.discalimertext}>
              Get the premium plan to add videos or more than three photos to
              your profile
            </Text>
          </View>

          <View style={styles.fabcontainer}>
            <FloatingButton onPress={handleSumbit} />
          </View>
        </View>
      </AppForm>
    </AuthScreen>
  );
}

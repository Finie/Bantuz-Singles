import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';

import AuthScreen from 'src/components/screen/AuthScreen';
import Text from 'src/components/Text';
import AppForm from 'src/components/forms/AppForm';
import useThemeStyles from 'src/hooks/useThemeStyles';
import {Modal, ModalContent} from 'react-native-modals';
import Toast from 'react-native-toast-message';

import Musicnote from 'src/assets/icons/musicnote.svg'; //
import InactiveNote from 'src/assets/icons/inactivenote.svg'; //mapinactive.svg
import Fashion from 'src/assets/icons/fashionprimary.svg';
import InactiveFashion from 'src/assets/icons/inactivefashion.svg';
import PaintPrimary from 'src/assets/icons/fooddrinkprimary.svg';
import PaintInactivr from 'src/assets/icons/paininactive.svg';
import Foodiconprimaty from 'src/assets/icons/paintprimary.svg';
import BirthDayCake from 'src/assets/icons/birthdaycake.svg';
import BirthDayCakeInactive from 'src/assets/icons/cakeinactive.svg';
import MapInactive from 'src/assets/icons/mapinactive.svg';
import Unchecked from 'src/assets/icons/checkboxunchek.svg';
import Checked from 'src/assets/icons/checkboxcheck.svg';

import Info from 'src/assets/icons/infoicon.svg';
import Add from 'src/assets/icons/add.svg';
import FloatingLabelInput from 'src/components/FloatingLabelInput';
import Button from 'src/components/pressable/Button';
import PassionItem from 'src/components/PassionItem';
import Helpers from 'src/Helpers';
import {UserProfile} from 'src/utils/shared.types';
import authRouter from 'src/api/routers/authRouter';
import AnimatedLottieView from 'lottie-react-native';
import {VerticalMapList} from 'src/components/view/VerticalMapList';
import MorePassionItem from 'src/components/MorePassionItem';
import DropDwon from 'src/components/DropDwon';
import OverLayLoader from 'src/components/view/OverLayLoader';
import TextareaInput from 'src/components/forms/TextareaInput';
import TextInputError from 'src/components/forms/TextInputError';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
});

export default function InterestsScreen({navigation, route}) {
  const {colors} = useThemeStyles();

  const [moreSelected, setmoreSelected] = useState([] as any);
  const [dataMore, setdataMore] = useState([]);
  const [passion, setPassion] = useState([]);
  const [passionLoading, setPassionLoading] = useState(false);
  const [selectedPassion, setSelectedPassion] = useState([] as any);
  const [language, setLanguage] = useState([] as any);
  const [selectedLanguage, setSelectedLanguage] = useState([] as any);
  const [isPassionselected, setisPassionselected] = useState('');
  const [islangselected, setIslangselected] = useState('');
  const [editaboutme, seteditaboutme] = useState('');
  const [isAboutmeset, setIsAboutmeset] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [responseMessge, setResponseMessge] = useState(
    ' Congratulations, your account has been successfully created, continue to login.',
  );

  const [isLoading, setIsloading] = useState(false);
  const [isOthersFetching, setisOthersFetching] = useState(false);

  const [selectedLookFor, setSelectedLookFor] = useState('');
  const [islookforset, setIslookforset] = useState('');

  const UserInfo: UserProfile = route.params.data;

  const fetchPassions = async () => {
    setPassionLoading(true);
    const response = await authRouter.fetchPassions();
    setPassionLoading(false);

    if (response.ok) {
      setPassion(response.data.data);
      return;
    }

    setResponseMessge(response.data.data);
  };

  const fetchOtherData = async () => {
    setisOthersFetching(true);
    const response = await authRouter.fetchOtherPersions();
    setisOthersFetching(false);

    if (response.ok) {
      console.log('====================================');
      console.log(JSON.stringify(response.data.data));
      console.log('====================================');

      return;
    }

    console.log('====================================');
    console.log(response);
    console.log('====================================');
  };

  const fetchLanguages = async () => {
    const response = await authRouter.fetchLanguages();

    if (response.ok) {
      setLanguage(response.data.data);
      console.log('====================================');
      console.log(response.data);
      console.log('====================================');

      return;
    }

    console.log('====================================');
    console.log(response);
    console.log('====================================');
  };

  const handleSumbit = async () => {
    if (Helpers.isEmpty(editaboutme)) {
      setIsAboutmeset('Required field');
      return;
    } else if (Helpers.isEmpty(selectedLanguage)) {
      setIslangselected('Required field');
      return;
    } else if (Helpers.isEmpty(selectedLookFor)) {
      setIslookforset('Required field');
      return;
    } else if (Helpers.isEmpty(selectedPassion)) {
      setisPassionselected('Required field');
      return;
    }

    const request: UserProfile = {
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
          google_place_id: '',
          name: '',
          longitude: UserInfo.profile.location.longitude,
          latitude: UserInfo.profile.location.latitude,
        },
        media: UserInfo.profile.media,
        bio: {
          bio: editaboutme,
          looking_for: selectedLookFor,
          language_ids: selectedLanguage,
          passion_ids: selectedPassion,
          other_details_ids: moreSelected,
        },
      },
    };

    setIsloading(true);
    const response = await authRouter.createUser(request);
    setIsloading(false);

    if (response.ok) {
      setIsModalVisible(true);
      return;
    }

    Toast.show({
      type: 'error',
      text1: 'Request failed',
      text2: response.data.message,
      position: 'bottom',
    });
    // setIsModalVisible(true);
    // setdataMore(response.data);
    console.log('================all====================');
    console.log(response.data);
    console.log('====================================');
    Toast;
  };

  useEffect(() => {
    fetchLanguages();
    fetchOtherData();
    fetchPassions();
  }, []);

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
      padding: 8,
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

    imageholdercontainer: {
      marginTop: 15,
    },
    passion: {
      fontSize: 16,
      lineHeight: 19,
      color: colors.black,
      fontWeight: '700',
    },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 16,
      backgroundColor: colors.snow,
      padding: 5,
      borderRadius: 10,
    },
    mustpick: {marginLeft: 16, fontSize: 12, lineHeight: 14},
    pash: {marginTop: 20},
    pash2: {marginTop: 20, flexDirection: 'row'},
    selectioninactive: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.snow,
      padding: 10,
      borderRadius: 8,
      marginRight: 8,
    },
    selectionactive: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: 8,
      marginRight: 8,
    },
    selectiontexttypeinactive: {marginHorizontal: 16},
    selectiontexttypeactive: {marginHorizontal: 16, color: colors.white},
    buttoncontainer: {marginHorizontal: 30, marginVertical: 30},
    passionholder: {
      marginTop: 16,
    },
    passioniteholder: {
      marginVertical: 5,
      flexDirection: 'row',
    },
    passionname: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '600',
      color: colors.black,
      marginVertical: 20,
    },
    morecontainer: {
      borderWidth: 1,
      padding: 16,
      borderColor: colors.snow,
    },

    morecontainerisFirst: {
      borderWidth: 1,
      padding: 16,
      borderColor: colors.snow,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    morecontainerisLast: {
      borderWidth: 1,
      padding: 16,
      borderColor: colors.snow,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    morename: {
      marginLeft: 16,
      fontSize: 14,
      lineHeight: 17,
      color: colors.black,
    },
  });

  // const isSelected = (
  //   array: {id: number; name: string}[],
  //   index: number | any,
  // ) => {
  //   for (var i = 0; i < array.length; i++) {
  //     if (array[i].id === index) {
  //       console.log('====================================');
  //       console.log('found');
  //       console.log(array[i]);
  //       console.log('====================================');
  //       return true;
  //     }
  //     return false;
  //   }
  // };

  const getIconType = (index: number) => {
    switch (index) {
      case 0:
        return <Musicnote />;
        break;
      case 1:
        return <Fashion />;
        break;
      case 2:
        return <BirthDayCake />;
        break;
      case 3:
        return <PaintPrimary />;
        break;
      default:
        return <Foodiconprimaty />;
        break;
    }
  };

  const getInactiveIconType = (index: number) => {
    switch (index) {
      case 0:
        return <InactiveNote />;
        break;
      case 1:
        return <InactiveFashion />;
        break;
      case 2:
        return <BirthDayCakeInactive />;
        break;
      case 3:
        return <PaintInactivr />;
        break;
      default:
        return <MapInactive />;
        break;
    }
  };

  const Lookfor = [
    {
      id: 0,
      name: 'MAN',
    },
    {
      id: 1,
      name: 'WOMAN',
    },
    {
      id: 2,
      name: 'BOTH',
    },
  ];

  const Loader = () => {
    return (
      <View
        style={{
          marginTop: 16,
        }}>
        <AnimatedLottieView
          autoPlay
          loop
          style={{
            height: 70,
            marginVertical: -6,
          }}
          source={require('src/assets/lottie/list_loader.json')}
        />
        <AnimatedLottieView
          autoPlay
          loop
          style={{
            height: 70,
            marginVertical: -6,
          }}
          source={require('src/assets/lottie/list_loader.json')}
        />
        <AnimatedLottieView
          autoPlay
          loop
          style={{
            height: 70,
            marginVertical: -6,
          }}
          source={require('src/assets/lottie/list_loader.json')}
        />
      </View>
    );
  };

  return (
    <AuthScreen
      onBackPressed={function (): void {
        navigation.goBack();
      }}>
      <OverLayLoader isLoading={isLoading} />
      <AppForm
        initialValues={{
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSumbit}>
        <View style={styles.container}>
          <Text style={styles.howtwxt}>
            Tell us something interesting about yourself.
          </Text>
          <Text style={styles.discalimertext2}>
            Your potential matches will get a better sense about who you are.
          </Text>

          <View style={styles.imageholdercontainer}>
            <TextareaInput
              onBlur={() => console.log('blur')}
              onChangeText={text => {
                seteditaboutme(text);
                setIsAboutmeset('');
              }}
              placeholder="About Me"
            />

            <TextInputError
              error={isAboutmeset}
              visible={!Helpers.isEmpty(isAboutmeset)}
            />

            <DropDwon
              title={'I am looking for a'}
              description={'please select one'}
              data={Lookfor}
              onSelect={(value: {id: number; name: string}) => {
                setIslookforset('');
                setSelectedLookFor(value.name);
              }}
            />
            <TextInputError
              error={islookforset}
              visible={!Helpers.isEmpty(islookforset)}
            />

            <DropDwon
              title={'I speak'}
              description={'English'}
              data={language}
              onSelect={(value: {id: number; name: string}) => {
                selectedLanguage.push(value.id);
                setIslangselected('');
              }}
            />
            <TextInputError
              error={islangselected}
              visible={!Helpers.isEmpty(islangselected)}
            />
          </View>

          <View style={styles.pash}>
            <Text style={styles.passion}>Passions</Text>

            <TextInputError
              error={isPassionselected}
              visible={!Helpers.isEmpty(isPassionselected)}
            />

            <View style={styles.info}>
              <Info />
              <Text style={styles.mustpick}>You must pick at least 3</Text>
            </View>
          </View>

          <View style={styles.passionholder}>
            <VerticalMapList
              data={passion}
              renderItem={({item, index}) => (
                <PassionItem
                  Icon={getIconType(item.id)}
                  label={item.name}
                  Inactive={getInactiveIconType(item.id)}
                  onItemRemoved={() => {
                    setisPassionselected(
                      selectedPassion.length > 0
                        ? ''
                        : 'Please select a few passions',
                    );
                    setSelectedPassion(
                      selectedPassion.filter((items: number) => {
                        return items !== item.id;
                      }),
                    );
                  }}
                  onItemAdded={() => {
                    setisPassionselected('');
                    selectedPassion.push(item.id);
                  }}
                />
              )}
              numColumns={2}
            />
          </View>

          {/* <View>
            <Text style={styles.passionname}>More</Text>
            {isOthersFetching ? (
              <Loader />
            ) : (
              <>
                {!Helpers.isEmpty(dataMore) &&
                  dataMore.map((item, index) => {
                    return (
                      <MorePassionItem
                        index={index}
                        lastIndex={dataMore.length - 1}
                        item={item}
                        onItemAdded={function(): void {
                          moreSelected.push(item.id);
                        }}
                        onItemUnselected={function(): void {
                          setmoreSelected(
                            moreSelected.filter((items: number) => {
                              return items !== item.id;
                            }),
                          );
                        }}
                      />
                    );
                  })}
              </>
            )}
          </View> */}
        </View>

        <View style={styles.buttoncontainer}>
          <Button onPress={handleSumbit}>Finish</Button>
        </View>
      </AppForm>
      <Modal
        visible={isModalVisible}
        swipeThreshold={200} // default 100
        width={300}
        onTouchOutside={() => {
          setIsModalVisible(false);
          navigation.navigate('signIn');
        }}>
        <ModalContent style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <AnimatedLottieView
              autoPlay={true}
              loop={false}
              style={{width: 100, height: 100}}
              source={require('src/assets/lottie/successful.json')}
            />

            <Text
              style={{
                fontSize: 20,
                lineHeight: 26,
                textAlign: 'center',
                marginTop: 16,
                color: colors.black,
              }}>
              {responseMessge}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(false);
              navigation.navigate('signIn');
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
              borderWidth: 1,
              padding: 8,
              width: '50%',
              borderRadius: 16,
              borderColor: colors.silver,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                lineHeight: 26,
                color: colors.silver,
              }}>
              Log in
            </Text>
          </TouchableOpacity>
        </ModalContent>
      </Modal>
    </AuthScreen>
  );
}

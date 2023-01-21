import {View, StyleSheet, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import RangeSlider from 'rn-range-slider';

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

import Screen from 'src/components/screen/Screen';
import FloatingLabelInput from 'src/components/FloatingLabelInput';
import useThemeStyles from 'src/hooks/useThemeStyles';
import Thumb from 'src/components/Slider/Thumb';
import Rail from 'src/components/Slider/Rail';
import RailSelected from 'src/components/Slider/RailSelected';
import Label from 'src/components/Slider/Label';
import Notch from 'src/components/Slider/Notch';
import Text from 'src/components/Text';
import PassionItem from 'src/components/PassionItem';
import Button from 'src/components/pressable/Button';
import authRouter from 'src/api/routers/authRouter';
import homeRouter from 'src/api/routers/homeRouter';

export default function ExploreFilter({navigation}) {
  const {colors} = useThemeStyles();

  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);
  const [minDistane, setminDistane] = useState(0);
  const [maxDistance, setMaxDistance] = useState(900);
  const [passion, setPassion] = useState([] as any);
  const [otherPassion, setOtherPassion] = useState([] as any);
  const [selectedpassions, setSelectedpassions] = useState([] as any);
  const [selectedOtherPassion, setSelectedOtherPassion] = useState([] as any);
  const [isLoading, setIsLoading] = useState(false);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const [isPassionLoading, setIsPassionLoading] = useState(false);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);

  const distanceValueChange = useCallback((low, high) => {
    setminDistane(low);
    setMaxDistance(high);
  }, []);

  useEffect(() => {
    getPassions();
    getOtherPassions();
  }, []);

  const getPassions = async () => {
    setIsPassionLoading(true);
    const response = await authRouter.fetchPassions();

    if (response.ok) {
      console.log('====================================');
      console.log(response.data);
      console.log('====================================');
      setPassion(response.data.data);
      return;
    }

    console.log('==============Error======================');
    console.log(response);
    console.log('====================================');
  };

  const getOtherPassions = async () => {
    setIsPassionLoading(true);
    const response = await authRouter.fetchOtherPersions();

    if (response.ok) {
      console.log('====================================');
      console.log(response.data);
      console.log('====================================');
      setOtherPassion(response.data.data);
      return;
    }

    console.log('==============Error======================');
    console.log(response);
    console.log('====================================');
  };

  const fetchSearchInfo = async () => {
    var passionStringBuilder = '';
    for (var i = 0; i < selectedpassions.length; i++) {
      passionStringBuilder =
        passionStringBuilder + `&passions=${selectedpassions[i]}`;
    }

    var otherPassionStringBuilder = '';
    for (var i = 0; i < selectedOtherPassion.length; i++) {
      otherPassionStringBuilder =
        otherPassionStringBuilder + `&others=${selectedOtherPassion[i]}`;
    }

    console.log('===============Selected other passions=====================');
    console.log(otherPassionStringBuilder);
    console.log(passionStringBuilder);
    console.log('Distance range', minDistane, '-', maxDistance);
    console.log('age range', low, '-', high);
    console.log('====================================');

    const request = {
      minAge: low,
      maxAge: high,
      minDistane: minDistane,
      maxDistance: maxDistance,
      other: otherPassionStringBuilder,
      passion: passionStringBuilder,
      page: 1,
      pageSize: 100,
      longitude: 0,
      latitude: 0,
    };

    setIsLoading(true);
    const response = await homeRouter.searchUsersByFlags(request);
    setIsLoading(false);

    if (response.ok) {
      console.log('====================================');
      console.log(response.data.data.data);
      console.log('====================================');

      navigation.navigate('exporeScreen', {
        isSearch: true,
        result: response.data.data.data,
      });
      return;
    }

    console.log('====================================');
    console.log(response);
    console.log('====================================');
  };

  const styles = StyleSheet.create({
    floatinputcontainer: {
      marginHorizontal: 30,
    },
    root: {
      alignItems: 'stretch',
      padding: 12,
      flex: 1,
      backgroundColor: '#555',
    },
    slider: {},
    button: {},
    header: {
      alignItems: 'center',
      backgroundColor: 'black',
      padding: 12,
    },
    horizontalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    text: {
      color: 'white',
      fontSize: 20,
    },
    valueText: {
      width: 50,
      color: 'white',
      fontSize: 20,
    },
    age: {
      color: colors.primary,
      fontSize: 14,
      lineHeight: 17.01,
      fontWeight: '600',
    },
    ageContainer: {
      marginHorizontal: 30,
      marginVertical: 20,
    },
    between: {
      marginVertical: 20,
      fontSize: 14,
      lineHeight: 17.01,
      fontWeight: '400',
    },
    agetext: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '600',
      color: colors.black,
    },
    passionholder: {
      marginHorizontal: 30,
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
    buttons: {
      marginTop: 60,
      marginHorizontal: 30,
      marginBottom: 200,
    },
  });
  return (
    <Screen
      title="Search"
      isheaderVisible
      onBackPress={() => navigation.goBack()}
      isLoading={isLoading}
    >
      <View style={styles.floatinputcontainer}>
        <FloatingLabelInput
          label="Search (optional)"
          search
          onChangeText={text => console.log(text)}
          onBlur={() => console.log()}
        />
      </View>

      <View style={styles.ageContainer}>
        <Text style={styles.agetext}>Age</Text>
        <Text style={styles.between}>
          Between <Text style={styles.age}>{low}</Text> and{' '}
          <Text style={styles.age}>{high}</Text> years
        </Text>
        <RangeSlider
          style={styles.slider}
          min={18}
          max={50}
          step={1}
          floatingLabel
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderLabel={renderLabel}
          renderNotch={renderNotch}
          onValueChanged={handleValueChange}
        />
      </View>

      <View style={styles.ageContainer}>
        <Text style={styles.agetext}>Distance</Text>
        <Text style={styles.between}>
          Between <Text style={styles.age}>{minDistane}</Text> and{' '}
          <Text style={styles.age}>{maxDistance}</Text> kilometres away
        </Text>
        <RangeSlider
          style={styles.slider}
          min={0}
          max={900}
          step={1}
          floatingLabel
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderLabel={renderLabel}
          renderNotch={renderNotch}
          onValueChanged={distanceValueChange}
        />
      </View>

      <View style={styles.passionholder}>
        <Text style={styles.passionname}>Passions</Text>

        <View style={styles.passioniteholder}>
          <FlatList
            data={passion}
            numColumns={2}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({item, index}) => (
              <PassionItem
                // Icon={<Musicnote />}
                label={item.name}
                Inactive={<InactiveNote />}
                onItemAdded={function(): void {
                  selectedpassions.push(item.id);
                }}
                onItemRemoved={function(): void {
                  setSelectedpassions(
                    selectedpassions.filter((element: {id: any}) => {
                      return element.id !== item.id;
                    }),
                  );
                }}
              />
            )}
          />
        </View>
      </View>

      <View style={styles.passionholder}>
        <Text style={styles.passionname}>More</Text>

        <View style={styles.passioniteholder}>
          <FlatList
            data={otherPassion}
            numColumns={2}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({item, index}) => (
              <PassionItem
                // Icon={<Musicnote />}
                label={item.name}
                Inactive={<InactiveNote />}
                onItemAdded={function(): void {
                  selectedOtherPassion.push(item.id);
                }}
                onItemRemoved={function(): void {
                  setSelectedOtherPassion(
                    selectedOtherPassion.filter((element: {id: any}) => {
                      return element.id !== item.id;
                    }),
                  );
                }}
              />
            )}
          />
        </View>
      </View>

      <View style={styles.buttons}>
        <Button
          onPress={() => {
            fetchSearchInfo();
          }}
        >
          Search
        </Button>
      </View>
    </Screen>
  );
}

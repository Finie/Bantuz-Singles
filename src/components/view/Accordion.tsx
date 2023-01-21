import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import LottieView from 'lottie-react-native';

import Text from '../Text';
import useThemeStyles from 'src/hooks/useThemeStyles';
import Unchecked from 'src/assets/icons/checkboxunchek.svg';
import Checked from 'src/assets/icons/checkboxcheck.svg';
import FloatingLabelInput from '../FloatingLabelInput';
import authRouter from 'src/api/routers/authRouter';

const Accordion = ({data, onTribeSelection}) => {
  const {colors} = useThemeStyles();
  const [isExpanded, setisExpanded] = useState(false);
  const [ismiddleExpanded, setismiddleExpanded] = useState(false);
  const [isOthersExpanded, setisOthersExpanded] = useState(false);
  const [selectedId, setselectedId] = useState(100);
  const [isLoading, setIsloading] = useState(false);
  const [tribeData, setTribeData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  console.log('====================================');
  console.log(data);
  console.log('====================================');

  const toogleExpand = () => {
    setisExpanded(!isExpanded);
    setisOthersExpanded(false);
    setismiddleExpanded(false);
  };

  const toogleOtherExpand = () => {
    setisOthersExpanded(!isOthersExpanded);
    setisExpanded(false);
    setismiddleExpanded(false);
  };

  const tooglemiddleExpand = () => {
    setisOthersExpanded(false);
    setisExpanded(false);
    setismiddleExpanded(!ismiddleExpanded);
  };

  const choosePosition = (clicked: {id: number; name: string}) => {
    // if (clicked.id === 1) {
    //   toogleExpand();
    //   fetchEthnicGroups(clicked.id);
    // } else if (clicked.id === 2) {
    //   tooglemiddleExpand();
    // } else if (clicked.id === 3) {
    //   toogleOtherExpand();
    // }

    if (clicked.id === selectedIndex) {
      setSelectedIndex(-1);
      return;
    }

    setSelectedIndex(clicked.id);
    fetchEthnicGroups(clicked.id);
  };

  const fetchEthnicGroups = async (id: number) => {
    setTribeData([]);
    setIsloading(true);
    const response = await authRouter.getListOfethnicGroups(id);
    setIsloading(false);

    if (response.ok) {
      setTribeData(response.data.data);
      console.log('====================================');
      console.log(JSON.stringify(response.data.data));
      console.log('====================================');
      return;
    }

    console.log('====================================');
    console.log(response);
    console.log('====================================');
  };

  const handleSelectedTribe = (item: {id: number; name: string}) => {
    setselectedId(item.id);
    onTribeSelection(item.name);
  };

  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors.snow,
    },
    kencontainer: {
      borderWidth: 1,
      borderColor: colors.snow,
      borderTopRightRadius: 6,
      borderTopLeftRadius: 6,
    },
    otncontainer: {
      borderWidth: 1,
      borderColor: colors.snow,
      borderBottomRightRadius: 6,
      borderBottomLeftRadius: 6,
    },
    headercontainer: {
      padding: 8,
      flexDirection: 'row',
      height: 56,
      alignItems: 'center',
    },
    headertext: {
      marginLeft: 16,
      fontSize: 14,
      lineHeight: 17,
      color: colors.black,
    },
    bodycontainer: {
      padding: 8,
      flexDirection: 'row',
      height: 56,
      alignItems: 'center',
      marginLeft: 30,
      borderWidth: 1,
      borderColor: colors.snow,
    },
    bodycontainerinput: {
      padding: 8,
      marginLeft: 30,
      borderWidth: 1,
      borderColor: colors.snow,
    },
  });
  const Accordions = ({header, onPress, isExpanded}) => {
    return (
      <Collapse isExpanded={isExpanded}>
        <CollapseHeader>
          <TouchableOpacity
            onPress={onPress}
            style={
              header === 'Kenya'
                ? styles.kencontainer
                : header === 'Other'
                ? styles.otncontainer
                : styles.container
            }
          >
            <View style={styles.headercontainer}>
              {!isExpanded ? <Unchecked /> : <Checked />}
              <Text style={styles.headertext}>{header}</Text>
            </View>
          </TouchableOpacity>
        </CollapseHeader>

        <CollapseBody>
          {header === 'Other' ? (
            <View style={styles.bodycontainerinput}>
              <FloatingLabelInput
                onBlur={() => console.log()}
                style={{marginVertical: 0}}
                label="Country"
              />
              <FloatingLabelInput
                style={{marginVertical: 0}}
                label="City / Town"
                onBlur={() => console.log()}
              />
            </View>
          ) : (
            <>
              {isLoading && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <LottieView
                    autoPlay={true}
                    loop={true}
                    source={require('src/assets/lottie/ethnicityload.json')}
                    style={{height: 10}}
                  />
                  <Text style={{marginTop: 16}}>fetching groups ...</Text>
                </View>
              )}
              {tribeData.map((item, index) => {
                return (
                  <>
                    {item.name !== 'Other' ? (
                      <TouchableOpacity
                        onPress={() => {
                          handleSelectedTribe(item);
                        }}
                        style={styles.bodycontainer}
                      >
                        {item.id === selectedId ? <Checked /> : <Unchecked />}
                        <Text style={styles.headertext}>{item.name}</Text>
                      </TouchableOpacity>
                    ) : (
                      <Collapse>
                        <CollapseHeader>
                          <TouchableOpacity
                            onPress={() => {
                              handleSelectedTribe(item);
                            }}
                            style={styles.bodycontainer}
                          >
                            {item.id === selectedId ? (
                              <Checked />
                            ) : (
                              <Unchecked />
                            )}
                            <Text style={styles.headertext}>{item.name}</Text>
                          </TouchableOpacity>
                        </CollapseHeader>
                        <CollapseBody>
                          <Text>fdgdfgdf</Text>
                        </CollapseBody>
                      </Collapse>
                    )}
                  </>
                );
              })}
            </>
          )}
        </CollapseBody>
      </Collapse>
    );
  };

  return (
    <>
      {data.map((item, index) => {
        return (
          <Accordions
            onPress={() => {
              choosePosition(item);
            }}
            isExpanded={item.id === selectedIndex}
            header={item.name}
          />
        );
      })}
    </>
  );
};

export default Accordion;

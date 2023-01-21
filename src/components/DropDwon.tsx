import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {BottomModal, ModalContent} from 'react-native-modals';

import Dropdown from 'src/assets/icons/dropdown.svg';
import Text from './Text';
import useThemeStyles from 'src/hooks/useThemeStyles';
import {FlatList} from 'react-native-gesture-handler';

type Props = {
  onSelect: (value: number | String) => number | string;
  title: string;
  description: string;
  data: {
    id: number;
    name: string;
  }[];
};

const DropDwon: React.FC<Props> = ({title, description, data, onSelect}) => {
  const {colors} = useThemeStyles();
  const [modalVisible, setModalVisible] = useState(false);
  const [indescription, setIndescription] = useState(description);

  const handleSelection = (item: {id: number; name: string}) => {
    setModalVisible(false);
    setIndescription(item.name);
    onSelect(item);
  };
  const styles = StyleSheet.create({
    dropcontainer: {
      borderWidth: 0.3,
      padding: 8,
      borderRadius: 10,
      borderColor: colors.silver,
      marginVertical: 10,
    },
    header: {},
    description: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginTop: 12,
    },
    desc: {
      color: colors.black,
    },
    text: {
      fontSize: 18,
      lineHeight: 22,
      fontWeight: '700',
      color: colors.black,
    },
    touchable: {
      padding: 8,
    },
  });
  return (
    <>
      <View style={styles.dropcontainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.header}>{title}</Text>
          <View style={styles.description}>
            <Text style={styles.desc}>{indescription}</Text>
            <Dropdown />
          </View>
        </TouchableOpacity>
      </View>

      <BottomModal
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(false)}
        height={0.5}
        width={1}
        onSwipeOut={() => setModalVisible(false)}
      >
        <ModalContent>
          <View>
            <FlatList
              data={data}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => handleSelection(item)}
                  style={styles.touchable}
                >
                  <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default DropDwon;

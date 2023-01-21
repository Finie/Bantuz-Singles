import {StyleSheet} from 'react-native';
import useThemeStyles from 'src/hooks/useThemeStyles';
export default () => {
  const {colors} = useThemeStyles();
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 24,
      paddingVertical: 20,
      backgroundColor: colors.white,
      marginHorizontal: 8,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: colors.silver,
    },
    input: {
      color: colors.black,
      flex: 1,
      maxHeight: 100,
      fontSize: 16,
      fontFamily: 'SourceSansPro-Regular',
      // Fixes default paddings for Android
      paddingBottom: 0,
      paddingTop: 0,
    },
    marginRight: {
      marginRight: 16,
    },
  });
};

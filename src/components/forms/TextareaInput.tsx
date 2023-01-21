import {View, StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import useThemeStyles from 'src/hooks/useThemeStyles';

type Props = {
  placeholder: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  textValue: string;
};

const TextareaInput: React.FC<Props> = ({
  placeholder,
  onChangeText,
  onBlur,
  textValue,
  ...otherProps
}) => {
  const {colors} = useThemeStyles();

  const [textinputs, settextinputs] = useState(textValue);
  const styles = StyleSheet.create({
    textAreaContainer: {
      borderColor: colors.silver,
      borderWidth: 0.5,
      padding: 5,
      backgroundColor: colors.white,
      borderRadius: 10,
      marginVertical: 8,
    },
    textArea: {
      minHeight: 124,
      width: '100%',
      justifyContent: 'flex-start',
      textAlignVertical: 'top',
      fontSize: 16,
      lineHeight: 20,
      paddingHorizontal: 8,
    },
  });

  const onTextchanges = (text: string) => {
    settextinputs(text);
    onChangeText(text);
  };

  return (
    <View style={styles.textAreaContainer}>
      <TextInput
        style={styles.textArea}
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        value={textinputs}
        onBlur={onBlur}
        {...otherProps}
        placeholderTextColor={colors.silver}
        onChangeText={onTextchanges}
        multiline={true}
      />
    </View>
  );
};

export default TextareaInput;

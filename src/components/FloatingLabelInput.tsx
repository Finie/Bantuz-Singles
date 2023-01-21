import React, {Component} from 'react';
import {
  View,
  TextInput,
  Animated,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import EyeClose from 'src/assets/icons/invisibleeye.svg';
import Search from 'src/assets/icons/machsearch.svg';
import Verified from 'src/assets/icons/isverified.svg';
import Pending from 'src/assets/icons/ispending.svg';

interface Props {
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  label: string;
  icon?: boolean;
  search?: boolean;
  isVerified?: boolean;
  isPending?: boolean;
  style?: StyleProp<TextStyle>;
  textValue?: string;
}

class FloatingLabelInput extends Component<Props> {
  state = {
    isFocused: false,
    isPasswordShown: false,
    value: this.props.textValue ? this.props.textValue : '',
  };
  private _animatedIsFocused: any;

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(
      this.state.value === '' ? 0 : 1,
    );
    this.setState({
      isPasswordShown: this.props.icon,
      value: this.props.textValue,
    });
  }

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused || this.state.value !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }

  handleFocus = () => this.setState({isFocused: true});
  handleBlur = () => {
    this.props.onBlur();
    this.setState({isFocused: false});
  };
  handleTextInput = (text: string) => {
    this.props.onChangeText(text);
    this.setState({
      value: text,
    });

    console.log('====================================');
    console.log(this.state.value);
    console.log('====================================');
  };

  handleShowHidePassword = () => {
    if (this.state.isPasswordShown) {
      this.setState({
        isPasswordShown: false,
      });
      return;
    }
    this.setState({
      isPasswordShown: true,
    });
  };

  render() {
    const {
      label,
      icon = false,
      search = false,
      isVerified = false,
      isPending = false,
      style,
      textValue = '',
      ...props
    } = this.props;

    const labelStyle = {
      position: 'absolute',
      left: 10,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [32, 15],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 12],
      }),
      color: '#8492A6',
    };

    const styles = StyleSheet.create({
      container: {
        marginVertical: 1,
      },
      touchable: {
        position: 'absolute',
        top: 50,
        right: 18,
      },
      textinputstyles: {
        minHeight: 64,
        borderColor: '#E5E5E5',
        borderWidth: 1,
        fontSize: 14,
        lineHeight: 17,
        marginVertical: 3,
        borderRadius: 10,
        paddingLeft: 10,
        paddingTop: 8,
        fontFamily: 'SourceSansPro-Regular',
      },
    });

    return (
      <View style={{paddingTop: 8}}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          {...props}
          style={[styles.textinputstyles, style]}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          returnKeyType="done"
          onChangeText={this.handleTextInput}
          secureTextEntry={this.state.isPasswordShown}
          blurOnSubmit
          value={textValue ? textValue : this.state.value}
        />
        {icon && (
          <TouchableOpacity
            onPress={this.handleShowHidePassword}
            style={styles.touchable}>
            <EyeClose />
          </TouchableOpacity>
        )}

        {isVerified && (
          <TouchableOpacity
            onPress={this.handleShowHidePassword}
            style={styles.touchable}>
            <Verified />
          </TouchableOpacity>
        )}

        {isPending && (
          <TouchableOpacity
            onPress={this.handleShowHidePassword}
            style={styles.touchable}>
            <Pending />
          </TouchableOpacity>
        )}

        {search && (
          <View style={styles.touchable}>
            <Search />
          </View>
        )}
      </View>
    );
  }
}

export default FloatingLabelInput;

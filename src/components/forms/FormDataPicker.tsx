import {View, Text} from 'react-native';
import React from 'react';
import {useFormikContext} from 'formik';
import GikuyuDate from '../GikuyuDate';
import TextInputError from './TextInputError';

type Props = {
  name: any;
};

const FormDataPicker: React.FC<Props> = props => {
  const {touched, handleChange, errors} = useFormikContext();
  const {name} = props;
  return (
    <>
      <GikuyuDate onDateChange={handleChange(name)} />
      <TextInputError error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default FormDataPicker;

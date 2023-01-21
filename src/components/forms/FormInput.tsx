import React from 'react';
import {useFormikContext} from 'formik';

import FloatingLabelInput from '../FloatingLabelInput';
import TextInputError from './TextInputError';

type Props = {
  name: any;
  placeholder: string;
  ispassword?: boolean;
};


const FormInput: React.FC<Props> = props => {
  const {name, placeholder, ispassword, ...otherProps} = props;
  const {setFieldTouched, touched, handleChange, errors} = useFormikContext();
  return (
    <>
      <FloatingLabelInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        label={placeholder}
        icon={ispassword}
        {...otherProps}
      />

      <TextInputError error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default FormInput;

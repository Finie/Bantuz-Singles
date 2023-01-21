import React from 'react';
import {useFormikContext} from 'formik';

import TextInputError from './TextInputError';
import TextareaInput from './TextareaInput';

type Props = {
  name: any;
  placeholder: string;
};

const TextareaForm: React.FC<Props> = ({name, placeholder, ...otherProps}) => {
  const {setFieldTouched, touched, handleChange, errors} = useFormikContext();
  return (
    <>
      <TextareaInput
        placeholder={placeholder}
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        {...otherProps}
      />
      <TextInputError error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default TextareaForm;

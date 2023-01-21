import React from 'react';
import {useFormikContext} from 'formik';
import FloatingButton from '../FloatingButton';

const FabSubmit = () => {
  const {handleSubmit} = useFormikContext();
  return <FloatingButton onPress={handleSubmit} />;
};

export default FabSubmit;

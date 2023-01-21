import React from 'react';
import {useFormikContext} from 'formik';

import Button from '../pressable/Button';

type Props = {
  title: string;
};
const SubmitForm: React.FC<Props> = props => {
  const {title} = props;

  const {handleSubmit} = useFormikContext();

  return <Button onPress={handleSubmit}>{title}</Button>;
};

export default SubmitForm;

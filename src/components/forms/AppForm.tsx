import {Formik} from 'formik';
import React, {ReactNode} from 'react';

type Props = {
  initialValues: any;
  onSubmit: ({}: any) => void;
  validationSchema: any;
  children: ReactNode;
};

const AppForm: React.FC<Props> = props => {
  const {initialValues, onSubmit, validationSchema, children} = props;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {() => <>{children}</>}
    </Formik>
  );
};

export default AppForm;

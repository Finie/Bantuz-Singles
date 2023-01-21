import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import Helpers from 'src/Helpers';

type Props = {
  onDateChange: (date: Date) => void;
};

const GikuyuDate: React.FC<Props> = props => {
  const {onDateChange} = props;
  const [date, setDate] = useState(
    new Date(Helpers.getTheMinimumSelectableYear()),
  );

  const handleSelected = (datee: Date) => {
    onDateChange(datee);
    setDate(datee);
  };
  return (
    <DatePicker
      androidVariant={'iosClone'}
      mode={'date'}
      date={date}
      onDateChange={handleSelected}
      maximumDate={new Date(Helpers.getTheMinimumSelectableYear())}
    />
  );
};

export default GikuyuDate;

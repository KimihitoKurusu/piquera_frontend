import React from 'react'
import moment from 'moment'
import type { Rule } from 'antd/lib/form'
import { ConfigProvider, DatePicker, DatePickerProps, Form } from 'antd'
import {RangePickerProps} from "antd/es/date-picker";
import dayjs from "dayjs";
import 'moment/locale/es';
import locale from 'antd/lib/locale/es_ES';
type CustomDatePickerProps = DatePickerProps & {
  required?: boolean,
  name: string,
  placeholder: string,
  otherRules?: Rule[],
  isDisabledDate?: boolean,
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: moment.Moment) => void
}


const CustomDatePicker: React.FC<CustomDatePickerProps> = (props) => {
  const {
    required = false,
    name,
    placeholder,
    onChange = null,
    otherRules = [],
    ...restProps
  } = props;

  return (
      <>

      </>
  );
};

export default CustomDatePicker;

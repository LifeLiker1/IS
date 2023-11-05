import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Space } from 'antd';
dayjs.extend(customParseFormat);
const dateFormat = 'DD.MM.YYYY';

const Calendars= () => (
  <Space direction="vertical" size={12}>
    <DatePicker defaultValue={dayjs('01.01.2023', dateFormat)} format={dateFormat} />
  </Space>
);

export default Calendars

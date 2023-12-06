import React from 'react';
import { Watermark } from 'antd';

const CustomWatermark: React.FC = () => (
  <Watermark content="Piquera de Taxis">
    <div style={{ height: 500 }} />
  </Watermark>
);

export default CustomWatermark;

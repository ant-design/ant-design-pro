import React from 'react';
import { Icon } from 'antd';

const IconUp = ({ color }) => (
  <Icon
    style={{
      color: (color === false) ? 'rgba(0,0,0,0.43)' : '#00a854',
      fontSize: 12,
      transform: 'scale(0.83)',
    }}
    type="caret-up"
  />
);

const IconDown = ({ color }) => (
  <Icon
    style={{
      color: (color === false) ? 'rgba(0,0,0,0.43)' : '#f04134',
      fontSize: 12,
      transform: 'scale(0.83)',
    }}
    type="caret-down"
  />
);

export default {
  IconUp,
  IconDown,
};

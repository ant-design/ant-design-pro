import React from 'react';
import { Radio } from 'antd';

import styles from './index.less';

const RadioButton = Radio.Button;

export default props => (<div className={styles.radioText}>
  <RadioButton {...props} />
</div>);

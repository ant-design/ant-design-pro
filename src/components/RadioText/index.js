import React from 'react';
import { Radio } from 'antd';

import styles from './index.less';

export default props => (
  <div className={styles.radioText}>
    <Radio.Button {...props} />
  </div>
);

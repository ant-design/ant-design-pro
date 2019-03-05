import { Col } from 'antd';
import { ColProps } from 'antd/es/col';
import React from 'react';
import styles from './index.less';
import responsive from './responsive';

export interface IDescriptionProps extends ColProps {
  column?: number;
  key?: string | number;
  style?: React.CSSProperties;
  term?: React.ReactNode;
}

const Description: React.SFC<IDescriptionProps> = ({ term, column, children, ...restProps }) => (
  <Col {...responsive[column]} {...restProps}>
    {term && <div className={styles.term}>{term}</div>}
    {children !== null && children !== undefined && <div className={styles.detail}>{children}</div>}
  </Col>
);

Description.defaultProps = {
  term: '',
};

export default Description;

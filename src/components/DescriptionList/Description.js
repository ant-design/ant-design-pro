import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import styles from './index.less';
import responsive from './responsive';

const Description = ({ term, column, children, ...restProps }) => (
  <Col {...responsive[column]} {...restProps}>
    {term && <div className={styles.term}>{term}</div>}
    {children !== null && children !== undefined && <div className={styles.detail}>{children}</div>}
  </Col>
);

Description.defaultProps = {
  term: '',
};

Description.propTypes = {
  term: PropTypes.node,
};

export default Description;

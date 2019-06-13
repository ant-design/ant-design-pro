import React, { Component } from 'react';
import { Card, Icon } from 'antd';
import styles from './SvgIcon.less';
import { FormattedMessage } from 'umi-plugin-react/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import * as SvgIcons from '@/svg/icon/es';

class SvgIcon extends Component {
  state = {};

  render() {
    return (
      <PageHeaderWrapper title={<FormattedMessage id="app.svgicon.title" />}>
        <Card bordered={false}>
          <ul className={styles.ul}>
            {Object.keys(SvgIcons).map(item => {
              return (
                <li key={item} className={styles.li}>
                  <Icon component={SvgIcons[item]} />
                  <span className="anticon-class">
                    <span className="ant-badge">{item}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default SvgIcon;

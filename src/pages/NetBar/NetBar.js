import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

// import styles from './NetBar.less';
class NetBar extends Component {
  state = {};

  render() {
    return (
      <PageHeaderWrapper title="网吧管理">
        <div className="shopping-list">
          <h1>Shopping List for</h1>
          <ul>
            <li>Instagram</li>
            <li>WhatsApp</li>
            <li>Oculus</li>
          </ul>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default NetBar;

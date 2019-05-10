import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

// import styles from './Proxy.less';
class Proxy extends Component {
  state = {};

  render() {
    return (
      <PageHeaderWrapper title="代理商管理">
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

export default Proxy;

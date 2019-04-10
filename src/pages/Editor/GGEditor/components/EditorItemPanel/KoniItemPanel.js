import React from 'react';
import { Card } from 'antd';
import { ItemPanel, Item } from 'gg-editor';
import styles from './index.less';

const KoniItemPanel = () => {
  return (
    <ItemPanel className={styles.itemPanel}>
      <Card bordered={false}>
        <Item
          type="node"
          size="40"
          shape="koni-custom-node"
          model={{
            color: '#69C0FF',
            label: 'Bank',
            labelOffsetY: 28,
            icon: '/ggeditor/koni/icon.svg',
          }}
          src="/ggeditor/koni/bank.svg"
        />
        <Item
          type="node"
          size="40"
          shape="koni-custom-node"
          model={{
            color: '#5CDBD3',
            label: 'Person',
            labelOffsetY: 28,
            icon: '/ggeditor/koni/icon.svg',
          }}
          src="/ggeditor/koni/person.svg"
        />
        <Item
          type="node"
          size="40"
          shape="koni-custom-node"
          model={{
            color: '#B37FEB',
            label: 'Country',
            labelOffsetY: 28,
            icon: '/ggeditor/koni/icon.svg',
          }}
          src="/ggeditor/koni/country.svg"
        />
      </Card>
    </ItemPanel>
  );
};

export default KoniItemPanel;

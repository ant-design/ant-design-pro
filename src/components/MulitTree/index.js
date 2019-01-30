import React, { Component } from 'react';
import { Dropdown, Menu, Icon, Card, List } from 'antd';
import styles from './index.less';

class MulitTree extends Component {
  state = {
    toggle: {},
    click: { all: true },
  };

  IconClick = (e, item) => {
    const { id } = item;
    const { toggle } = this.state;
    e.stopPropagation();
    toggle[id] = !toggle[id];
    this.setState(toggle);
  };

  handleDepartmentSelect = () => {};

  childDom(items, count) {
    let cou = count;
    cou += 1;
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a href="">
            <Icon type="plus-square" className={styles.menuIcon} />
            增加分组
          </a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="">
            <Icon type="close-circle" className={styles.menuIcon} />
            删除分组
          </a>
        </Menu.Item>
      </Menu>
    );
    const { toggle } = this.state;
    const { click } = this.state;

    if (items.length !== 0) {
      return items.map(item => (
        <div className={styles.treeNode} key={item.name}>
          <div
            className={click[item.id] ? styles.nodeCardClick : styles.nodeCard}
            style={{ paddingLeft: `${cou * 10 + 15}px` }}
            onClick={() => this.handleDepartmentSelect(item)}
          >
            {item.child.length !== 0 ? (
              <Icon
                type={toggle[item.id] ? 'down-circle' : 'right-circle'}
                theme="filled"
                className={styles.secIcon}
                onClick={e => this.IconClick(e, item)}
              />
            ) : null}
            <span>{item.name}</span>
            <Dropdown overlay={menu} trigger={['click']}>
              <Icon type="ellipsis" className={styles.dropIcon} />
            </Dropdown>
          </div>
          {item.child.length !== 0 && toggle[item.id] ? this.childDom(item.child, cou) : null}
        </div>
      ));
    }
    return null;
  }

  renderSection() {
    const data = [
      {
        id: 'parent1',
        name: 'parent1',
        child: [
          {
            id: 'child1',
            name: 'child1',
            child: [
              {
                id: 'grand child1',
                name: 'grand child1',
                child: [],
              },
              {
                id: 'grand child2',
                name: 'grand child2',
                child: [],
              },
            ],
          },
          {
            id: 'child2',
            name: 'child2',
            child: [
              {
                id: 'grand child1',
                name: 'grand child1',
                child: [],
              },
              {
                id: 'grand child2',
                name: 'grand child2',
                child: [],
              },
            ],
          },
        ],
      },
    ];
    return this.childDom(data, 0);
  }

  renderMenu = () => {
    const { click } = this.state;
    const data = [
      {
        id: 'all',
        text: '所用成员',
      },
      {
        id: 'new',
        text: '新加入成员',
      },
      {
        id: 'noWork',
        text: '未分配部门成员',
      },
      {
        id: 'block',
        text: '停用成员',
      },
    ];
    return data.map(item => (
      <div
        key={item.id}
        className={click[item.id] ? styles.nodeCardClick : styles.nodeCard}
        onClick={() => this.handleDepartmentSelect(item)}
      >
        <Icon type="user" className={styles.secIcon} />
        {item.text}
      </div>
    ));
  };

  render() {
    return (
      <Card bordered={false}>
        <div className={styles.mune}>
          <div className={styles.title}>成员</div>
          <List>{this.renderMenu()}</List>
          <div className={styles.title}>部门</div>

          <div className={styles.tree}>{this.renderSection()}</div>
        </div>
      </Card>
    );
  }
}
export default MulitTree;

import React, { Component } from 'react';
import { Dropdown, Menu, Icon, Card, List } from 'antd';
import styles from './index.less';

class MulitTree extends Component {
  state = {
    toggle: {},
    select: {},
  };

  IconClick = (e, item) => {
    const { id } = item;
    const { toggle } = this.state;
    e.stopPropagation();
    toggle[id] = !toggle[id];
    this.setState(toggle);
  };

  menuSelect = item => {
    const { id } = item;
    const { handlers } = this.props;
    const selection = {};

    selection[id] = true;
    this.setState({ select: selection });
    handlers(item);
  };

  childDom(items, count) {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a href="">
            <Icon type="plus" />
            &nbsp;增加子分组
          </a>
        </Menu.Item>
        <Menu.Item key="0">
          <a href="">
            <Icon type="edit" />
            &nbsp;重命名
          </a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="">
            <Icon type="close" />
            &nbsp;删除分组
          </a>
        </Menu.Item>
      </Menu>
    );
    const { toggle, select } = this.state;
    let cnt = count;
    cnt += 1;

    if (items.length !== 0) {
      return items.map(item => (
        <div key={item.name}>
          <div
            className={select[item.id] ? styles.nodeCardClick : styles.nodeCard}
            style={{ paddingLeft: `${(cnt - 1) * 10}px` }}
            onClick={() => this.menuSelect(item)}
          >
            {item.child.length !== 0 ? (
              <Icon
                type={toggle[item.id] ? 'down-circle' : 'right-circle'}
                className={styles.secIcon}
                onClick={e => this.IconClick(e, item)}
              />
            ) : null}
            <span>{item.name}</span>
            <Dropdown overlay={menu} trigger={['click']}>
              <Icon type="ellipsis" className={styles.dropIcon} />
            </Dropdown>
          </div>
          {item.child.length !== 0 && toggle[item.id] ? this.childDom(item.child, cnt) : null}
        </div>
      ));
    }
    return null;
  }

  renderSection(data) {
    return this.childDom(data, 0);
  }

  renderMenu = data => {
    const { select } = this.state;
    return data.map(item => (
      <div
        key={item.id}
        className={select[item.id] ? styles.nodeCardClick : styles.nodeCard}
        onClick={() => this.menuSelect(item)}
      >
        <Icon type={item.icon} className={styles.secIcon} />
        {item.text}
      </div>
    ));
  };

  render() {
    const { data } = this.props;
    const { menu, tree } = data;

    return (
      <Card bordered={false}>
        <h4>{menu.name}</h4>
        <List>{this.renderMenu(menu.list)}</List>
        <h4>{tree.name} </h4>
        <div>
          <div className={styles.nodeCard}>
            <Icon type="plus" className={styles.secIcon} />
            <span>新增分组</span>
          </div>
          {this.renderSection(tree.list)}
        </div>
      </Card>
    );
  }
}
export default MulitTree;

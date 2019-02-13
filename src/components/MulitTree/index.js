import React, { Component } from 'react';
import { Popover, Button, Form, Row, Col, Input, Dropdown, Menu, Icon, Card, List } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;
const InputGroup = Input.Group;

@Form.create()
class MulitTree extends Component {
  state = {
    toggle: {},
    select: {},
    rootGroupVisible: false,
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
    const { itemSelectHandlers } = this.props;
    const selection = {};

    selection[id] = true;
    this.setState({ select: selection });
    itemSelectHandlers(item);
  };

  onRootGroupCreate = () => {
    const { rootGroupCreateHandler } = this.props;
    const { form } = this.props;

    this.setState({
      rootGroupVisible: false,
    });

    form.validateFields(['newGroupName'], {}, (err, values) => {
      rootGroupCreateHandler(values.newGroupName || '新分组');
    });
  };

  handleVisibleChange = rootGroupVisible => {
    this.setState({ rootGroupVisible });
  };

  newGroupButton = () => {
    const { rootGroupVisible } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Popover
        placement="bottom"
        content={
          <Form style={{ width: '320px' }}>
            <FormItem>
              <Row gutter={8}>
                <Col span={18}>
                  <InputGroup compact>
                    {getFieldDecorator('newGroupName', {
                      rules: [
                        {
                          required: false,
                        },
                        {
                          pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_-]{1,32}$/,
                          message: '支持中文，字母，下划线',
                        },
                      ],
                    })(<Input size="large" placeholder="新分组" />)}
                  </InputGroup>
                </Col>
                <Col span={6}>
                  <Button size="large" type="primary" onClick={this.onRootGroupCreate}>
                    创建
                  </Button>
                </Col>
              </Row>
            </FormItem>
          </Form>
        }
        title="创建分组"
        trigger="click"
        visible={rootGroupVisible}
        onVisibleChange={this.handleVisibleChange}
      >
        <div className={styles.nodeCard}>
          <Icon type="plus" className={styles.secIcon} />
          <span>新增分组</span>
        </div>
      </Popover>
    );
  };

  childGroupsRender = (items, count) => {
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
          {item.child.length !== 0 && toggle[item.id]
            ? this.childGroupsRender(item.child, cnt)
            : null}
        </div>
      ));
    }
    return null;
  };

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
        {this.newGroupButton()}
        {this.childGroupsRender(tree.list, 0)}
      </Card>
    );
  }
}
export default MulitTree;

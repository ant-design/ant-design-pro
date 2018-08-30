import React, { PureComponent } from 'react';
import { Card, Table, Icon, message, Tooltip } from 'antd';
import { connect } from 'dva';
import style from './Index.less';
// 字典管理左侧列表树

@connect(({ loading }) => ({
  loading: loading.models.dict,
}))
export default class DictGrid extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dict/listDict',
    });
  }

  // 行点击事件
  handleOnRowClick = record => {
    // 根节点不加载
    if (record.parentId === 0) {
      return;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'dict/getDict',
      payload: {
        id: record.id,
        operateType: 'typeEdit',
      },
    });
  };

  // 字典删除
  handleDelete = record => {
    const { dispatch } = this.props;
    // 存在子节点的不允许删除
    dispatch({
      type: 'dict/deleteDict',
      payload: {
        id: record.id,
      },
      callback: () => {
        message.success('操作成功.');
      },
    });
  };

  // 新建分类
  handleAddClick = () => {
    console.info('add type click');
    this.props.dispatch({
      type: 'dict/updateState',
      payload: {
        operateType: 'typeCreate',
        currentItem: {},
      },
    });
  };

  render() {
    const { loading, data } = this.props;

    const column = [
      {
        dataIndex: 'code',
        title: '分类代码',
      },
      {
        dataIndex: 'name',
        title: '分类描述',
      },
      {
        title: '',
        render: (text, record) =>
          // 根分类不可进行删除
          record.parentId === '0' ? (
            ''
          ) : (
            <a onClick={e => this.handleDelete(record)}>
              <Icon type="delete" />
            </a>
          ),
      },
    ];

    return (
      <div>
        <Table
          indentSize={5}
          className={style.dict_left_tree}
          title={() => (
            <Card
              actions={[
                <Tooltip placement="bottom" title="新建分类">
                  <Icon type="edit" onClick={e => this.handleAddClick()} />
                </Tooltip>,
                <div />,
                ]}
            >
                字典分类
            </Card>
            )}
          onRow={(record, index) => ({
            onClick: () => this.handleOnRowClick(record, index),
          })}
          rowClassName={record => record.children ? style.top_node : style.blank}
          loading={loading}
          rowKey={record => record.id}
          defaultExpandAllRows
          scroll={{ y: 640 }}
          size="small"
          dataSource={data}
          columns={column}
          pagination={false}
        />
      </div>
    );
  }
}

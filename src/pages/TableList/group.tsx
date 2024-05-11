import React, { useRef } from 'react';
import { ActionType, ModalForm, ProColumns, ProFormText, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, message } from 'antd';
import { request } from '@umijs/max';

// 定义一个接口来描述分组的形状
interface Tag {
  id: number;
  TagKey: string;
  TagValue: string;
}

const TagsTable: React.FC = () => {
  // 创建一个actionRef来控制ProTable
  const actionRef = useRef<ActionType>();

const onFinish = async (values: { group_name: string, description: string }) => {
  try {
    // 使用@umijs/max的request方法发送POST请求
    const { success, message: apiMessage, group_id } = await request('https://867t766n6.zicp.fun/groups', {
      method: 'POST',
      data: {
        group_name: values.group_name,
        description: values.description, // 假设对于新分组TagValue是空的
      },
      // 注意：@umijs/max的request默认使用'application/json'，并自动转换body为JSON字符串
    });

    // 根据接口返回的success字段判断操作是否成功
    if (success) {
      message.success(apiMessage || '分组创建成功！');
      actionRef.current?.reload(); // 刷新表格以显示新创建的分组
      return true;
    } else {
      message.error(apiMessage || '分组创建失败。');
      return false;
    }
  } catch (error) {
    // 处理请求过程中出现的错误
    console.error('创建操作失败', error);
    message.error('操作异常，请稍后重试。');
    return false;
  }
};
  
  // 使用ProColumns<Tag>来确保columns与Tag接口一致
  const columns: ProColumns<Tag>[] = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '分组名称', dataIndex: 'group_name', key: 'group_name' },
    { title: '分组描述', dataIndex: 'description', key: 'description' },
    {
        title: '操作',
        key: 'action',
        render: (_, record: Tag) => (
          <Popconfirm
            placement="topRight"
            title="确定要删除此分组吗？"
            onConfirm={() => deleteTag(record)}
            okText="确定"
            cancelText="取消"
          >
            <Button danger>
              删除
            </Button>
          </Popconfirm>
        ),
    },
  ];

const deleteTag = async (record: Tag) => {
  try {
    // 使用@umijs/max的request方法发送DELETE请求
    const { success, message: apiMessage } = await request(`https://867t766n6.zicp.fun/groups/${record.id}`, {
      method: 'DELETE',
    });

    // 根据返回的success字段判断操作是否成功
    if (success) {
      message.success(apiMessage || '分组删除成功。');
    } else {
      message.error(apiMessage || '分组删除失败。');
    }

    // 如果你有引用ProTable的actionRef来刷新数据，也可以在这里调用
    actionRef.current?.reload();
  } catch (error) {
    // 处理请求过程中出现的错误
    console.error('删除操作失败', error);
    message.error('操作异常，请稍后重试。');
  }
};

  return <ProTable<Tag>
    columns={columns}
    actionRef={actionRef}
  request={async (params, sorter, filter) => {
    // 使用 @umijs/max 的 request 方法请求数据
    const response = await request('https://867t766n6.zicp.fun/groups', {
      method: 'GET', // 根据实际请求调整
      // 可以在这里传递查询参数（如分页信息），或者设置请求头部等
      // params: { ...params },
    });
  
    // 直接从response中解构出data
    const { data } = response;
  
    return {
      data: data, // 实际的数据数组
      success: true, // 请求是否成功
      total: data.length, // 数据总数，用于分页
    };
  }}
    
    rowKey="id"
    pagination={false}
    search={false}
    toolBarRender={() => [
        <ModalForm
          title="新建分组"
          trigger={
            <Button type="primary">
              新建分组
            </Button>
          }
          onFinish={onFinish}
          modalProps={{
            onCancel: () => console.log('取消新建分组'),
          }}
        >
          <ProFormText
            name="group_name"
            label="名称"
            rules={[{ required: true, message: '请输入分组名称' }]}
          />
          <ProFormText
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入分组描述' }]}
          />          
        </ModalForm>,
      ]}
  />;
};

export default TagsTable;

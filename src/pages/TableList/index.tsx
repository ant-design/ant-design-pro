import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, Image, Input, Modal, Popconfirm, Space, Tag, Tooltip, Typography, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { request } from '@umijs/max';
import { DeleteOutlined } from '@ant-design/icons';
const { Text, Link } = Typography;
const HistoryModalTable = ({ visible, guid, onCancel }) => {
  return (
    <Modal title="查看记录" open={visible} onCancel={onCancel} footer={null} width={1000} destroyOnClose>
      <ProTable
        columns={[
          {
            title: '时间',
            dataIndex: 'timestamp',
            valueType: 'dateTime',
          },
          {
            title: '类型',
            dataIndex: 'format',
            valueType: 'select',
            valueEnum: {
              CF_TEXT: {
                text: '文本',
              },
              CF_BITMAP: {
                text: '图片',
              },
            },
          },
          {
            title: '剪辑内容',
            dataIndex: 'content',
            width: '60%',
            render: (_, record) => {
              // 根据 format 判断内容类型
              if (record.format === 'CF_TEXT') {
                // 直接显示文本
                return record.content;
              } else if (record.format === 'CF_BITMAP') {
                // 显示为图片
                const imageUrl = `https://867t766n6.zicp.fun/${record.content}`;
                return <Image src={imageUrl} alt="剪辑图片" width={100} />;
              } else {
                // 其他类型显示默认信息
                return '未知内容';
              }
            },
          },
          {
            title: '地址',
            dataIndex: 'detected_address',
            key: 'detected_address',
          },
        ]}
        request={async (params) => {
          const response = await request(
            `https://867t766n6.zicp.fun/history?guid1=${guid}&pageSize=${params.pageSize}&current=${params.current}`,{
              method: 'GET'
            }
          );
          return {
            data: response.data || [],
            success: true,
            total: response.total || 0,
          };
        }}
        rowKey="id"
        pagination={{
          pageSize: 10,
        }}
        search={false}
      />
    </Modal>
  );
};

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({
      ...fields,
    });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在修改');
  try {
    await updateRule({
      key: [fields.id],
      name: fields.name,
      desc: fields.desc,
      group: fields.group,
    });
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败，请重试！');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};



const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);


  const handleViewClick = (record) => {
    setCurrentRow(record);
    setHistoryModalVisible(true);
  };

  const onFinish = async (values) => {
    try {
      // 发送批量分组请求
      await request('https://867t766n6.zicp.fun/batchGroupDevices', {
        method: 'POST',
        data: {
          group_id: values.group,
          device_ids: selectedRowKeys,
        },
      });
      console.log('分组设置成功！');
      message.success('分组设置成功！');
      // 调用成功回调
      actionRef.current?.reload();
      return true; // 关闭ModalForm
    } catch (error) {
      console.error('分组设置失败:', error);
      message.error('分组设置失败:', error);
      // 在这里处理错误情况
      return false; // 保持ModalForm开启，以便用户可以修正并重试
    }
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '名称',
      dataIndex: 'username',
      tip: '名称/用户名',
      hideInSearch: true,
      render: (dom, entity) => {
        return (
          <>
            {/* <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
           >
            {dom}
           </a> */}
            <Text type="success">{dom}</Text>
            <div>{entity.name}</div>
          </>
        );
      },
    },
    {
      title: '描述',
      dataIndex: 'desc',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '主机名',
      dataIndex: 'hostname',
      width: '10%',
      hideInSearch: true,
    },
    // {
    //   title: '本机IP',
    //   dataIndex: 'ip_mac',
    //   sorter: true,
    //   hideInForm: true,
    //   width: '10%',
    //   render: (_, record) => {
    //     return (
    //       <>
    //         {record.ip_mac.map((item, index) => (
    //           <Tooltip key={index} title={`${item.ip_address} (${item.mac})`}>
    //             <Tag>{`${item.ip_address.slice(0, 20)} (${item.mac})`}</Tag>
    //           </Tooltip>
    //         ))}
    //       </>
    //     );
    //   },
    // },
    {
      title: '分组',
      dataIndex: 'group_name',
      hideInForm: true,
      valueType: 'select',
      request: async () => {
          const response = await request('https://867t766n6.zicp.fun/groups', {
              method: 'GET',
          });
          // 映射返回的分组数据，并在数组开头添加 "未分组"
          const groups = response.data.map(item => ({ label: item.group_name, value: item.id }));

          // 添加未分组选项
          groups.unshift({ label: '未分组', value: 0 });

          return groups;
          // return response.data.map(item => ({ label: item.group_name , value: item.id }));
      },
      // render: (_, record) => (
      //     <Space direction="vertical">
      //         {record.search_word_obj.map((word, index) => (
      //             <Tag key={index} color="blue">
      //                 {word}
      //             </Tag>
      //         ))}
      //     </Space>
      // ),
      search: {
          transform: (value) => ({ group_id: value }),
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '离线',
          status: 'Default',
        },
        1: {
          text: '在线',
          status: 'Success',
        },
      },
    },
    {
      title: '上线时间',
      sorter: true,
      dataIndex: 'lastOnline',
      valueType: 'dateTime',
      hideInSearch: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder={'请输入异常原因！'} />;
        }
        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        // <a key="subscribeAlert">
        //   <FormattedMessage
        //     id="pages.searchTable.subscribeAlert"
        //     defaultMessage="Subscribe to alerts"
        //   />
        //   查看
        // </a>,
        <a key="view" onClick={() => handleViewClick(record)}>
          查看
        </a>,
        ,
        <Popconfirm
          placement="topRight"
          title="确定要删除此设备吗？"
          // onConfirm={() => removeRule({ key: [record.id] })}
          onConfirm={async () => {
            // 调用 removeRule 函数并传递参数
            await removeRule({ key: [record.id] });
            // 调用 actionRef 的 reloadAndRest 方法刷新表格
            actionRef.current?.reloadAndRest?.();
          }}
          okText="确定"
          cancelText="取消"
        >
          <a key="delete">
            删除
          </a>
        </Popconfirm>
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle="设备列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 0,
        }}
        // toolBarRender={() => [
        //   <Button
        //     type="primary"
        //     key="primary"
        //     onClick={() => {
        //       handleModalOpen(true);
        //     }}
        //   >
        //     <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
        //   </Button>,
        // ]}
        request={rule}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
        rowSelection={{
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRows(selectedRows);
          },
          // getCheckboxProps: (record) => ({
          //   disabled: record.id === 3, // 根据条件禁用某些行的选择框
          //   name: record.name,
          // }),
        }}
        toolBarRender={() => [
          <ModalForm
            title="批量设置分组"
            trigger={
              <Button type="primary" disabled={selectedRowKeys.length === 0}>
                批量设置分组
              </Button>
            }
            modalProps={{
              onCancel: () => console.log('取消批量设置分组'),
            }}
            onFinish={onFinish}
          >
            <ProFormSelect
              name="group"
              label="选择分组"
              rules={[{ required: true, message: '请选择一个分组' }]}
              request={async () => {
                try {
                  const { data } = await request('https://867t766n6.zicp.fun/groups', {
                    method: 'GET',
                  });
                  console.log(data);
                  return data.map((item) => ({
                    label: item.group_name, // 分组名称作为选项文本
                    value: item.id, // 分组ID作为选项值
                  }));
                } catch (error) {
                  console.error('获取分组失败:', error);
                  return [];
                }
              }}
              placeholder="请选择一个分组"
            />
          </ModalForm>,
          // <Button onClick={handleBatchEdit} disabled={!selectedRows.length}>批量修改</Button>,
          // <Button loading={isLoading} onClick={handleBatchLogin} disabled={!selectedRows.length}>批量登录</Button>,
          // <Button key="export" onClick={handleExport}>
          //     导出
          // </Button>,
        ]}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              {/* <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
               </span> */}
            </div>
          }
        >
          <Button
            icon={<DeleteOutlined />}
            onClick={() => {
              Modal.confirm({
                title: (
                  <>
                    确定要删除选择的设备吗？
                  </>
                ),
                content: '该操作无法撤销',
                onOk: async () => {
                  await handleRemove(selectedRowsState);
                  setSelectedRows([]);
                  actionRef.current?.reloadAndRest?.();
                },
              });
            }}
            danger
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={'新建规则'}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '规则名称为必填项',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate({
            ...value,
            id: currentRow?.id,
          });
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
      {/* 历史记录 ProTable 组件 */}
      <HistoryModalTable
        visible={historyModalVisible}
        guid={currentRow?.guid}
        onCancel={() => setHistoryModalVisible(false)}
      />
    </PageContainer>
  );
};
export default TableList;

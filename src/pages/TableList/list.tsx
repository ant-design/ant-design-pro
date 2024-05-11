import { addRule, history, removeRule, updateRule } from '@/services/ant-design-pro/api';
import { DeleteOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, Image, Modal, Popconfirm, Typography, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { request } from '@umijs/max';

const { Text, Link } = Typography;



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
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.guid,
    });
    hide();
    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
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
      key: selectedRows.map((row) => row.key),
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

const handleExport = async () => {
    try {
        const response = await request('https://867t766n6.zicp.fun/api/exportAccount', {
            responseType: 'blob',
        });
        const blob = new Blob([response], { type: 'text/csv' });  // 使用 response 而不是 response.data
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'export.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);  // 移除创建的链接
    } catch (error) {
        console.error('Error exporting file:', error);
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const handleViewClick = (record) => {
    setCurrentRow(record);
    setHistoryModalVisible(true);
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '名称',
      dataIndex: 'user_name',
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
      title: '内容',
      dataIndex: 'content',
      sorter: true,
      hideInForm: true,
      width: '60%',
    },
    {
      title: '地址',
      dataIndex: 'detected_address',
      hideInSearch: true,
    },
    {
      title: '时间',
      sorter: true,
      dataIndex: 'timestamp',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Popconfirm
          key={record.id}
          title="确定要删除该行吗？"
          onConfirm={async () => {
            await handleRemove(record.id); // 直接传递代理ID
            actionRef.current?.reload();
          }}
          okText="确定"
          cancelText="取消"
        >
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle="记录"
        actionRef={actionRef}
        rowKey="id"
        // search={{
        //   labelWidth: 120,
        // }}
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="export"
            onClick={() => {
              handleExport();
            }}
          >
            <ExportOutlined /> 导出
          </Button>,
        ]}
        request={history}
        columns={columns}
        rowSelection={{
          preserveSelectedRowKeys: true,
          selectedRowKeys,
          onChange: (keys, selectedRows) => {
            setSelectedRowKeys(keys);
            setSelectedRows(selectedRows);
          },
        }}
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
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
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
            guid: currentRow?.guid,
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
    </PageContainer>
  );
};
export default TableList;

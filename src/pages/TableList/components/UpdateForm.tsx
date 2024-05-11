import { ProFormText, ProFormTextArea, ProFormSelect, ModalForm } from '@ant-design/pro-components';
import '@umijs/max';
import { Button } from 'antd';
import { request } from '@umijs/max';
import React from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
  group?: number; // 分组选项的 ID
} & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.RuleListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalOpen, onCancel, onSubmit, values } = props;

  const handleFinish = async (formValues: FormValueType) => {
    await onSubmit(formValues);
  };

  return (
    <ModalForm<FormValueType>
      title="修改名称"
      width={640}
      open={updateModalOpen}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel(),
      }}
      onFinish={handleFinish}
      initialValues={{
        name: values.name,
        desc: values.desc,
        group: values.group_id, // 初始化时设定分组选项
      }}
      submitter={{
        render: (_, dom) => (
          <>
            <Button key="cancel" onClick={() => onCancel()}>
              取消
            </Button>
            {dom.pop()}
          </>
        ),
      }}
    >
      <ProFormText
        name="name"
        label="名称"
        rules={[
          {
            required: true,
            message: '请输入名称！',
          },
        ]}
        // width="md"
      />
      <ProFormTextArea
        name="desc"
        label="描述"
        rules={[
          {
            required: true,
            message: '请输入至少五个字符的描述！',
            min: 5,
          },
        ]}
        // width="md"
      />
      <ProFormSelect
        name="group"
        label="分组"
        request={async () => {
          try {
            const response = await request('https://867t766n6.zicp.fun/groups', {
              method: 'GET'
            }
            );
            const { data } = response;

            // 返回一个包含 { label, value } 键值对的数组
            return data.map((group: { id: number; group_name: string }) => ({
              label: group.group_name,
              value: group.id,
            }));
          } catch (error) {
            console.error('获取分组数据失败', error);
            return [];
          }
        }}
        // rules={[
        //   {
        //     required: true,
        //     message: '请选择一个分组！',
        //   },
        // ]}
        // width="md"
      />
    </ModalForm>
  );
};

export default UpdateForm;

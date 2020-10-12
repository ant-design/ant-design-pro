import React from 'react';
import { Modal } from 'antd';
import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormRadio,
  ProFormDateTimePicker,
} from '@ant-design/pro-form';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => (
  <StepsForm
    stepsProps={{
      size: 'small',
    }}
    stepsFormRender={(dom, submitter) => {
      return (
        <Modal
          width={640}
          bodyStyle={{ padding: '32px 40px 48px' }}
          destroyOnClose
          title="规则配置"
          visible={props.updateModalVisible}
          footer={submitter}
          onCancel={() => props.onCancel()}
        >
          {dom}
        </Modal>
      );
    }}
    onFinish={props.onSubmit}
  >
    <StepsForm.StepForm
      initialValues={{
        name: props.values.name,
        desc: props.values.desc,
      }}
      title="基本信息"
    >
      <ProFormText
        name="name"
        label="规则名称"
        rules={[{ required: true, message: '请输入规则名称！' }]}
      />
      <ProFormTextArea
        name="desc"
        label="规则描述"
        placeholder="请输入至少五个字符"
        rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
      />
    </StepsForm.StepForm>
    <StepsForm.StepForm
      initialValues={{
        target: '0',
        template: '0',
      }}
      title="配置规则属性"
    >
      <ProFormSelect
        name="target"
        label="监控对象"
        valueEnum={{
          0: '表一',
          1: '表二',
        }}
      />
      <ProFormSelect
        name="template"
        label="规则模板"
        valueEnum={{
          0: '规则模板一',
          1: '规则模板二',
        }}
      />
      <ProFormRadio.Group
        name="type"
        label="规则类型"
        options={[
          {
            value: '0',
            label: '强',
          },
          {
            value: '1',
            label: '弱',
          },
        ]}
      />
    </StepsForm.StepForm>
    <StepsForm.StepForm
      initialValues={{
        type: '1',
        time: '',
        frequency: 'month',
      }}
      title="设定调度周期"
    >
      <ProFormDateTimePicker
        name="time"
        label="开始时间"
        rules={[{ required: true, message: '请选择开始时间！' }]}
      />
      <ProFormSelect
        name="frequency"
        label="监控对象"
        width="xs"
        valueEnum={{
          month: '月',
          week: '周',
        }}
      />
    </StepsForm.StepForm>
  </StepsForm>
);

export default UpdateForm;

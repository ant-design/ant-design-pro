import { updateRule } from '@/services/ant-design-pro/api';
import {
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { message, Modal } from 'antd';
import React, { cloneElement, useCallback, useState } from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  trigger?: JSX.Element;
  onOk?: () => void;
  values: Partial<API.RuleListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { onOk, values, trigger } = props;

  const intl = useIntl();

  const [open, setOpen] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const { run } = useRequest(updateRule, {
    manual: true,
    onSuccess: () => {
      messageApi.success('Configuration is successful');
      onOk?.();
    },
    onError: () => {
      messageApi.error('Configuration failed, please try again!');
    },
  });

  const onCancel = useCallback(() => {
    setOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onFinish = useCallback(
    async (values?: any) => {
      await run({ data: values });

      onCancel();
    },
    [onCancel, run],
  );

  return (
    <>
      {contextHolder}
      {trigger
        ? cloneElement(trigger, {
            onClick: onOpen,
          })
        : null}
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
              title={intl.formatMessage({
                id: 'pages.searchTable.updateForm.ruleConfig',
                defaultMessage: '规则配置',
              })}
              open={open}
              footer={submitter}
              onCancel={onCancel}
            >
              {dom}
            </Modal>
          );
        }}
        onFinish={onFinish}
      >
        <StepsForm.StepForm
          initialValues={values}
          title={intl.formatMessage({
            id: 'pages.searchTable.updateForm.basicConfig',
            defaultMessage: '基本信息',
          })}
        >
          <ProFormText
            name="name"
            label={intl.formatMessage({
              id: 'pages.searchTable.updateForm.ruleName.nameLabel',
              defaultMessage: '规则名称',
            })}
            width="md"
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchTable.updateForm.ruleName.nameRules"
                    defaultMessage="请输入规则名称！"
                  />
                ),
              },
            ]}
          />
          <ProFormTextArea
            name="desc"
            width="md"
            label={intl.formatMessage({
              id: 'pages.searchTable.updateForm.ruleDesc.descLabel',
              defaultMessage: '规则描述',
            })}
            placeholder={intl.formatMessage({
              id: 'pages.searchTable.updateForm.ruleDesc.descPlaceholder',
              defaultMessage: '请输入至少五个字符',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchTable.updateForm.ruleDesc.descRules"
                    defaultMessage="请输入至少五个字符的规则描述！"
                  />
                ),
                min: 5,
              },
            ]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          initialValues={{
            target: '0',
            template: '0',
          }}
          title={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleProps.title',
            defaultMessage: '配置规则属性',
          })}
        >
          <ProFormSelect
            name="target"
            width="md"
            label={intl.formatMessage({
              id: 'pages.searchTable.updateForm.object',
              defaultMessage: '监控对象',
            })}
            valueEnum={{
              0: '表一',
              1: '表二',
            }}
          />
          <ProFormSelect
            name="template"
            width="md"
            label={intl.formatMessage({
              id: 'pages.searchTable.updateForm.ruleProps.templateLabel',
              defaultMessage: '规则模板',
            })}
            valueEnum={{
              0: '规则模板一',
              1: '规则模板二',
            }}
          />
          <ProFormRadio.Group
            name="type"
            label={intl.formatMessage({
              id: 'pages.searchTable.updateForm.ruleProps.typeLabel',
              defaultMessage: '规则类型',
            })}
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
            frequency: 'month',
          }}
          title={intl.formatMessage({
            id: 'pages.searchTable.updateForm.schedulingPeriod.title',
            defaultMessage: '设定调度周期',
          })}
        >
          <ProFormDateTimePicker
            name="time"
            width="md"
            label={intl.formatMessage({
              id: 'pages.searchTable.updateForm.schedulingPeriod.timeLabel',
              defaultMessage: '开始时间',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchTable.updateForm.schedulingPeriod.timeRules"
                    defaultMessage="请选择开始时间！"
                  />
                ),
              },
            ]}
          />
          <ProFormSelect
            name="frequency"
            label={intl.formatMessage({
              id: 'pages.searchTable.updateForm.object',
              defaultMessage: '监控对象',
            })}
            width="md"
            valueEnum={{
              month: '月',
              week: '周',
            }}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};

export default UpdateForm;

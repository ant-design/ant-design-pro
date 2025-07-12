import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, Result } from 'antd';
import type { FC } from 'react';
import type { BasicListItemDataType } from '../data.d';
import useStyles from '../style.style';

type OperationModalProps = {
  done: boolean;
  open: boolean;
  current: Partial<BasicListItemDataType> | undefined;
  onDone: () => void;
  onSubmit: (values: BasicListItemDataType) => void;
  children?: React.ReactNode;
};
const OperationModal: FC<OperationModalProps> = (props) => {
  const { styles } = useStyles();
  const { done, open, current, onDone, onSubmit, children } = props;
  if (!open) {
    return null;
  }
  return (
    <ModalForm<BasicListItemDataType>
      open={open}
      title={done ? null : `任务${current ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      width={640}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      initialValues={current}
      submitter={{
        render: (_, dom) => (done ? null : dom),
      }}
      trigger={children}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnHidden: true,
        bodyStyle: done
          ? {
              padding: '72px 0',
            }
          : {},
      }}
    >
      {!done ? (
        <>
          <ProFormText
            name="title"
            label="任务名称"
            rules={[
              {
                required: true,
                message: '请输入任务名称',
              },
            ]}
            placeholder="请输入"
          />
          <ProFormDateTimePicker
            name="createdAt"
            label="开始时间"
            rules={[
              {
                required: true,
                message: '请选择开始时间',
              },
            ]}
            fieldProps={{
              style: {
                width: '100%',
              },
            }}
            placeholder="请选择"
          />
          <ProFormSelect
            name="owner"
            label="任务负责人"
            rules={[
              {
                required: true,
                message: '请选择任务负责人',
              },
            ]}
            options={[
              {
                label: '付晓晓',
                value: 'xiao',
              },
              {
                label: '周毛毛',
                value: 'mao',
              },
            ]}
            placeholder="请选择管理员"
          />
          <ProFormTextArea
            name="subDescription"
            label="产品描述"
            rules={[
              {
                message: '请输入至少五个字符的产品描述！',
                min: 5,
              },
            ]}
            placeholder="请输入至少五个字符"
          />
        </>
      ) : (
        <Result
          status="success"
          title="操作成功"
          subTitle="一系列的信息描述，很短同样也可以带标点。"
          extra={
            <Button type="primary" onClick={onDone}>
              知道了
            </Button>
          }
          className={styles.formResult}
        />
      )}
    </ModalForm>
  );
};
export default OperationModal;

import React from 'react';
import { Modal } from 'antd';
import { useIntl } from 'umi';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel } = props;
  const intl = useIntl();

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({
        id: 'pages.searchTable.createForm.newRule',
        defaultMessage: '新建规则',
      })}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;

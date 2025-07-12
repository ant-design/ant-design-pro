import { Modal } from 'antd';
import React from 'react';

type CreateFormProps = {
  modalVisible: boolean;
  children?: React.ReactNode;
  onCancel: () => void;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnHidden
      title="新建规则"
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;

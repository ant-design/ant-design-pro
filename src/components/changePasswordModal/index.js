import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'dva';
import ChangePasswordForm from './ChangePasswordForm';

@connect(({ user }) => ({
  showChangePasswordModal: user.showChangePasswordModal,
}))
class TopNavHeader extends Component {
  closeChangePasswordModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/openChangePasswordModal',
      payload: false,
    });
  };

  render() {
    const { showChangePasswordModal } = this.props;
    return (
      <Modal
        title="修改密码"
        visible={showChangePasswordModal}
        onCancel={this.closeChangePasswordModal}
        footer={null}
      >
        <ChangePasswordForm />
      </Modal>
    );
  }
}

export default TopNavHeader;

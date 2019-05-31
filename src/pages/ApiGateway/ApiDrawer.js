import React, { PureComponent } from 'react';
import { Drawer, Modal, message, Col, Row } from 'antd';
import { connect } from 'dva';

@connect(({ userModel, uniComp, loading }) => ({
  userList: userModel.userList,
  uniComp,
  loading: loading.models.userList,
}))
class ApiDrawer extends PureComponent {
  state = {
    title: '',
    content: '',
    drawerVisible: false,
  };

  showDrawer = () => {
    this.setState({
      drawerVisible: true,
    });
  };

  onClose = () => {
    const { onVisible } = this.props;
    onVisible(false);
  };

  componentDidMount = () => {
    const { drawerVisible, title, content } = this.props;
    this.setState({ drawerVisible, title, content });
  };
  componentWillReceiveProps = () => {
    const { drawerVisible, title, content } = this.props;
    this.setState({ drawerVisible, title, content });
  };
  render() {
    const { title, content, drawerVisible } = this.props;

    return (
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={this.onClose}
        visible={drawerVisible}
      >
        {chil}
      </Drawer>
    );
  }
}

export default ApiDrawer;

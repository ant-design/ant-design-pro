/* 简单model测试 */
// react页面必须引入的组件
import React, { PureComponent } from 'react';
// 引入面包屑导航组件
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Authorized from '@/utils/Authorized';
import { Alert,Modal } from 'antd';
import Prompt from 'umi/prompt';
import { getAuth } from '@/utils/authority';

const noMatch = <Alert message="No permission." type="error" showIcon />;

const auth=getAuth("apiGateway1");
// console.log("auth=====:",auth);// 1ddd


class Test2 extends PureComponent {

  state={
    modalVisible:false,
  }

  isSave=false;

  handlePrompt = location => {
    if (!this.isSave) {
      this.showModalSave(location);
      return false;
    }
    return true;
  };

  showModalSave = location => {
    this.setState({
      modalVisible: true,
      location,
    });
  };


  closeModalSave = () => {
    // const { location } = this.state;
    // const { history } = this.props;
    this.setState({
      modalVisible: false,
    });
    // history.push({
    //   pathname: `..${location.pathname}`,
    // });
  };

  handlePrompt = location => {
    if (!this.isSave) {
      this.showModalSave(location);
      return false;
    }
    return true;
  };

  goBack=(e)=>{

  console.log(this.isSave,e);
    if (!this.isSave) {
      this.setState({
        modalVisible: true,
        back: true,
      });
      return false;
    }
    this.setState({
      back: false,
    });
    console.log(this.isSave,'ddddd');
    window.history.back();
    return true;
  }

  handleSave = () => {
    const { location,back } = this.state;
    const { history } = this.props;
    this.isSave = true;
    if(back){
      window.history.back();
    }
    else{
      console.log(location.pathname, 'pathname75');
      history.push({
        pathname: `..${location.pathname}`,
      });
    }
    this.setState({
      modalVisible: false,
      back:false,
    });
    console.log("=====save]=====")
  };

  render() {

    const {modalVisible} = this.state;
    // console.log("ddddabc:",localStorage.getItem("antd-pro-authority"));
    return (
      <PageHeaderWrapper
        onBack={this.goBack}
        style={{ height: '50px' }}
        title='test2'
      >
        <Authorized authority={auth} noMatch={noMatch}>
          {console.log("ddddddfiweieur29393990439 49390")}
          ddd
        </Authorized>
        <Prompt message={this.handlePrompt} />
        <Modal
          visible={modalVisible}
          onOk={this.handleSave}
          onCancel={() => this.closeModalSave()}
          title="提示"
        >
          <div>离开页面之前，你没有提交修改，确定是否离开本页面？</div>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default Test2;

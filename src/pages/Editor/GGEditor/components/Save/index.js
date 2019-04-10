import React from 'react';
import {Button} from 'antd';
import { withPropsAPI } from 'gg-editor';

class Save extends React.Component {

  handleSave = () => {
    const { propsAPI } = this.props;
    const { save } = propsAPI;
    const saveData=save();
    console.log(saveData);
    console.log(JSON.stringify(saveData));

  };


  render() {

    return (
      <div style={{padding:1}}>
        <Button style={{height:25}} onClick={this.handleSave}>保存</Button>
      </div>
    );
  }
}

export default withPropsAPI(Save);

import React, {PureComponent} from 'react';
import {Switch, Transfer,Modal} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Prompt from 'umi/prompt';

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
  });
}

const oriTargetKeys = mockData
  .filter(item => +item.key % 3 > 1)
  .map(item => item.key);

class OrgTransfer1 extends PureComponent {
  state = {
    targetKeys: oriTargetKeys,
    selectedKeys: [],
    disabled: false,
  }

  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys });

    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  }

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  }

  handleScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  }

  handleDisable = (disabled) => {
    this.setState({ disabled });
  };

  setKey = (record) => {
    return record.title;
  };

  handlePrompt = location => {
    console.log(location);
    if (!this.isSave) {
      console.log("1",location);
      return false;
    }
    return true;
  };

  goBack=()=>{
    window.history.back();
  }

  render() {
    const { targetKeys, selectedKeys, disabled } = this.state;
    return (
      <PageHeaderWrapper
        onBack={this.goBack}
        style={{ height: '50px' }}
        title='test2'
      >
        <div>

          <Prompt when message={location => `Are you sure you want to go to ${location.pathname}`} />
          <Transfer
            rowKey={this.setKey}
            dataSource={mockData}
            titles={['Source', 'Target']}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={this.handleChange}
            onSelectChange={this.handleSelectChange}
            onScroll={this.handleScroll}
            render={item => item.title}
            disabled={disabled}
          />
          <Switch
            unCheckedChildren="disabled"
            checkedChildren="disabled"
            checked={disabled}
            onChange={this.handleDisable}
            style={{ marginTop: 16 }}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default OrgTransfer1;

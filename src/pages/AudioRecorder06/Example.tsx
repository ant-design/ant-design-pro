import React, { useState } from 'react';
import AudioRecorder from './AudioRecorder';
import { Card, Tabs, Button, message } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import './index.less';

const { TabPane } = Tabs;

const Example: React.FC = () => {
  const [recordedFile, setRecordedFile] = useState<string | null>(null);
  const [modalRecordedFile, setModalRecordedFile] = useState<string | null>(null);

  // 处理录音完成
  const handleRecordFinish = (filePath: string) => {
    setRecordedFile(filePath);
    message.success('录音完成，已保存录音文件');
  };

  // 处理录音取消
  const handleRecordCancel = () => {
    setRecordedFile(null);
    message.info('录音已取消');
  };

  // 处理弹框模式录音完成
  const handleModalRecordFinish = (filePath: string) => {
    setModalRecordedFile(filePath);
    message.success('弹框模式录音完成，已保存录音文件');
  };

  // 处理弹框模式录音取消
  const handleModalRecordCancel = () => {
    setModalRecordedFile(null);
    message.info('弹框模式录音已取消');
  };

  // 播放录音
  const playRecording = (filePath: string | null) => {
    if (!filePath) {
      message.warning('没有录音文件可以播放');
      return;
    }

    try {
      const audio = new Audio(filePath);
      audio.play();
      message.info('开始播放录音');
    } catch (error) {
      console.error('播放录音失败:', error);
      message.error('播放录音失败，请重试');
    }
  };

  return (
    <div className="audio-recorder-example">
      <h2>录音组件使用示例</h2>
      
      <Tabs defaultActiveKey="1" className="example-tabs">
        {/* 直接嵌入模式 */}
        <TabPane tab="直接嵌入模式" key="1">
          <Card title="录音组件（直接嵌入）" bordered={false} className="example-card">
            <AudioRecorder
              maxDuration={60} // 最大录音时长，默认60秒
              onFinish={handleRecordFinish}
              onCancel={handleRecordCancel}
              modalMode={false} // 直接嵌入模式
            />
            
            {/* 录音结果展示 */}
            {recordedFile && (
              <div className="recording-result">
                <h4>录音结果</h4>
                <Button
                  type="primary"
                  icon={<PlayCircleOutlined />}
                  onClick={() => playRecording(recordedFile)}
                >
                  播放录音
                </Button>
                <p>录音文件路径: {recordedFile}</p>
              </div>
            )}
          </Card>
        </TabPane>

        {/* 弹框模式 */}
        <TabPane tab="弹框模式" key="2">
          <Card title="录音组件（弹框模式）" bordered={false} className="example-card">
            <AudioRecorder
              maxDuration={60}
              onFinish={handleModalRecordFinish}
              onCancel={handleModalRecordCancel}
              modalMode={true} // 弹框模式
              triggerButton="打开录音弹框" // 自定义触发按钮文本
            />
            
            {/* 弹框模式录音结果展示 */}
            {modalRecordedFile && (
              <div className="recording-result">
                <h4>弹框模式录音结果</h4>
                <Button
                  type="primary"
                  icon={<PlayCircleOutlined />}
                  onClick={() => playRecording(modalRecordedFile)}
                >
                  播放录音
                </Button>
                <p>录音文件路径: {modalRecordedFile}</p>
              </div>
            )}
          </Card>
        </TabPane>

        {/* 自定义配置模式 */}
        <TabPane tab="自定义配置模式" key="3">
          <Card title="录音组件（自定义配置）" bordered={false} className="example-card">
            <AudioRecorder
              maxDuration={30} // 自定义最大录音时长为30秒
              onFinish={(filePath) => {
                setRecordedFile(filePath);
                message.success('自定义配置模式录音完成');
              }}
              onCancel={() => {
                setRecordedFile(null);
                message.info('自定义配置模式录音已取消');
              }}
              modalMode={false}
            />
            
            {/* 自定义配置模式录音结果展示 */}
            {recordedFile && (
              <div className="recording-result">
                <h4>自定义配置模式录音结果</h4>
                <Button
                  type="primary"
                  icon={<PlayCircleOutlined />}
                  onClick={() => playRecording(recordedFile)}
                >
                  播放录音
                </Button>
                <p>录音文件路径: {recordedFile}</p>
                <p>自定义最大录音时长: 30秒</p>
              </div>
            )}
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Example;
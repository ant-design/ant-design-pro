import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, message } from 'antd';
import { AudioOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import './index.less';

interface AudioSegment {
  blob: Blob;
  duration: number;
}

interface AudioRecorderProps {
  maxDuration?: number; // 最大录音时长，默认60秒
  onFinish?: (filePath: string) => void; // 录音完成回调
  onCancel?: () => void; // 取消录音回调
  modalMode?: boolean; // 是否为弹框模式
  triggerButton?: React.ReactNode; // 弹框模式下的触发按钮
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  maxDuration = 60,
  onFinish,
  onCancel,
  modalMode = false,
  triggerButton,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [segments, setSegments] = useState<AudioSegment[]>([]);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // 请求麦克风权限
  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermissionGranted(true);
      streamRef.current = stream;
      return stream;
    } catch (error) {
      console.error('麦克风权限请求失败:', error);
      setPermissionGranted(false);
      showMessage('error', '麦克风权限被拒绝，请检查浏览器设置');
      return null;
    }
  };

  // 开始录音
  const startRecording = async () => {
    if (isRecording) return;

    // 如果还没有权限，先请求权限
    if (permissionGranted === null) {
      const stream = await requestMicrophonePermission();
      if (!stream) return;
    } else if (!permissionGranted) {
      showMessage('error', '麦克风权限被拒绝，请检查浏览器设置');
      return;
    }

    setIsRecording(true);
    audioChunksRef.current = [];
    startTimeRef.current = Date.now();

    try {
      // 如果之前的stream已经关闭，重新请求
      let stream = streamRef.current;
      if (!stream || stream.active === false) {
        stream = await requestMicrophonePermission();
        if (!stream) return;
      }

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(100); // 每100ms收集一次数据
      mediaRecorderRef.current = mediaRecorder;

      // 启动定时器更新当前时长
      timerRef.current = setInterval(() => {
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setCurrentDuration(duration);

        // 检查是否超过最大时长
        if (duration >= maxDuration) {
          stopRecording();
          showMessage('warning', `已达到最大录音时长${maxDuration}秒`);
        }
      }, 100);
    } catch (error) {
      console.error('开始录音失败:', error);
      setIsRecording(false);
      showMessage('error', '开始录音失败，请重试');
    }
  };

  // 停止录音
  const stopRecording = () => {
    if (!isRecording || !mediaRecorderRef.current) return;

    setIsRecording(false);
    clearInterval(timerRef.current!);

    mediaRecorderRef.current.stop();

    // 计算当前分段的时长
    const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);

    // 保存当前分段
    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      const newSegment: AudioSegment = { blob: audioBlob, duration };
      setSegments((prev) => [...prev, newSegment]);
      setTotalDuration((prev) => prev + duration);
      setCurrentDuration(0);
    };
  };

  // 合并所有录音分段
  const mergeSegments = async () => {
    if (segments.length === 0) {
      showMessage('warning', '没有录音数据');
      return;
    }

    try {
      // 创建一个新的Blob，包含所有分段的数据
      const allBlobs = segments.map((segment) => segment.blob);
      const mergedBlob = new Blob(allBlobs, { type: 'audio/webm' });

      // 创建一个临时URL
      const url = URL.createObjectURL(mergedBlob);

      // 调用完成回调
      if (onFinish) {
        onFinish(url);
      }

      showMessage('success', '录音完成');
      resetRecorder();

      // 如果是弹框模式，关闭弹框
      if (modalMode) {
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error('合并录音分段失败:', error);
      showMessage('error', '合并录音失败，请重试');
    }
  };

  // 清空所有录音数据
  const clearSegments = () => {
    resetRecorder();
    if (onCancel) {
      onCancel();
    }
    showMessage('info', '录音已取消');

    // 如果是弹框模式，关闭弹框
    if (modalMode) {
      setIsModalVisible(false);
    }
  };

  // 重置录音器状态
  const resetRecorder = () => {
    setIsRecording(false);
    setSegments([]);
    setCurrentDuration(0);
    setTotalDuration(0);
    clearInterval(timerRef.current!);

    // 停止所有轨道
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    mediaRecorderRef.current = null;
    audioChunksRef.current = [];
    setPermissionGranted(null);
  };

  // 显示提示消息
  const showMessage = (type: 'success' | 'error' | 'warning' | 'info', content: string) => {
    message[type](content, 1); // 1秒后自动消失
  };

  // 组件卸载时清理资源
  useEffect(() => {
    return () => {
      resetRecorder();
    };
  }, []);

  // 渲染录音按钮
  const renderRecordButton = () => {
    return (
      <div
        className={`audio-recorder-button ${isRecording ? 'recording' : ''}`}
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        onMouseLeave={stopRecording}
        onTouchStart={startRecording}
        onTouchEnd={stopRecording}
      >
        <AudioOutlined />
        <span>{isRecording ? '松开停止' : '长按录音'}</span>
      </div>
    );
  };

  // 渲染进度条
  const renderProgressBar = () => {
    const currentProgress = isRecording ? (currentDuration / maxDuration) * 100 : 0;

    // 计算每个已录制分段的起始位置
    const segmentPositions = segments.reduce((acc, segment, index) => {
      const previousTotalDuration = segments.slice(0, index).reduce((sum, s) => sum + s.duration, 0);
      const startPosition = (previousTotalDuration / maxDuration) * 100;
      const segmentProgress = (segment.duration / maxDuration) * 100;
      acc.push({ startPosition, segmentProgress });
      return acc;
    }, [] as { startPosition: number; segmentProgress: number }[]);

    // 计算当前正在录制的分段的起始位置
    const currentStartPosition = totalDuration > 0 ? (totalDuration / maxDuration) * 100 : 0;

    return (
      <div className="audio-recorder-progress">
        <div className="audio-recorder-progress-bar">
          {/* 已录制的分段 */}
          {segmentPositions.map((position, index) => (
            <div
              key={index}
              className="audio-recorder-progress-segment"
              style={{
                width: `${position.segmentProgress}%`,
                left: `${position.startPosition}%`,
              }}
            />
          ))}
          {/* 当前正在录制的分段 */}
          {isRecording && (
            <div
              className="audio-recorder-progress-current"
              style={{
                width: `${currentProgress}%`,
                left: `${currentStartPosition}%`,
              }}
            />
          )}
        </div>
        <div className="audio-recorder-duration">
          <span>{totalDuration + currentDuration}秒</span>
          <span>/</span>
          <span>{maxDuration}秒</span>
        </div>
      </div>
    );
  };

  // 渲染操作按钮
  const renderActionButtons = () => {
    const hasData = segments.length > 0 || isRecording;

    return (
      <div className="audio-recorder-actions">
        <Button
          type="default"
          icon={<CloseOutlined />}
          onClick={clearSegments}
          disabled={!hasData}
        >
          取消录音
        </Button>
        <Button
          type="primary"
          icon={<CheckOutlined />}
          onClick={mergeSegments}
          disabled={!hasData}
        >
          完成录音
        </Button>
      </div>
    );
  };

  // 渲染录音组件内容
  const renderRecorderContent = () => {
    return (
      <div className="audio-recorder-container">
        <h3>录音组件</h3>
        {renderRecordButton()}
        {renderProgressBar()}
        {renderActionButtons()}
      </div>
    );
  };

  // 如果是弹框模式，渲染弹框
  if (modalMode) {
    return (
      <>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          {triggerButton || '开始录音'}
        </Button>
        <Modal
          title="录音"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          {renderRecorderContent()}
        </Modal>
      </>
    );
  }

  // 否则，直接渲染组件
  return renderRecorderContent();
};

export default AudioRecorder;
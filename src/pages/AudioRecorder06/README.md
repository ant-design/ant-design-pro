# 录音组件 (AudioRecorder)

一个功能完善、界面美观的前端录音组件，支持长按录音、分段录制、进度可视化等功能，适配移动端和桌面端。

## 功能特性

### 1. 录音交互
- 长按录音按钮开始录音
- 松手自动暂停录音
- 支持移动端触摸事件

### 2. 分段录制
- 支持多次长按-松手的分段录音
- 自动保存每段录音数据
- 以进度条长度分割的方式显示分段

### 3. 进度可视化
- 录音时显示实时进度条
- 同步展示当前录音时长和最大录音时长
- 进度条随录音时长线性增长

### 4. 配置灵活性
- 支持自定义最大录音时长（默认60秒）
- 超出最大时长自动停止录音并提示

### 5. 操作控件功能
- 取消录音：清空所有分段数据
- 完成录音：合并所有分段，返回完整录音文件路径
- 按钮状态随录音状态动态禁用/启用

### 6. 提示消息
- 录音完成、取消、权限拒绝时显示浮动提示
- 提示1秒后自动消失

### 7. 使用模式
- 直接嵌入模式：可直接嵌入页面作为独立组件使用
- 弹框模式：支持通过触发按钮打开弹框

## 技术实现

- **React + TypeScript**：组件化开发，类型安全
- **MediaRecorder API**：浏览器原生录音API
- **Ant Design**：UI组件库，提供按钮、弹框等基础组件
- **Less**：CSS预处理器，实现组件样式

## 安装和使用

### 1. 直接使用组件

```tsx
import React from 'react';
import AudioRecorder from './AudioRecorder';

const App: React.FC = () => {
  // 处理录音完成
  const handleRecordFinish = (filePath: string) => {
    console.log('录音完成，文件路径:', filePath);
    // 可以在这里处理录音文件，比如上传到服务器
  };

  // 处理录音取消
  const handleRecordCancel = () => {
    console.log('录音已取消');
  };

  return (
    <div>
      <AudioRecorder
        maxDuration={60} // 最大录音时长，默认60秒
        onFinish={handleRecordFinish}
        onCancel={handleRecordCancel}
        modalMode={false} // 直接嵌入模式
      />
    </div>
  );
};

export default App;
```

### 2. 弹框模式使用

```tsx
import React from 'react';
import AudioRecorder from './AudioRecorder';

const App: React.FC = () => {
  // 处理录音完成
  const handleRecordFinish = (filePath: string) => {
    console.log('弹框模式录音完成，文件路径:', filePath);
  };

  // 处理录音取消
  const handleRecordCancel = () => {
    console.log('弹框模式录音已取消');
  };

  return (
    <div>
      <AudioRecorder
        maxDuration={60}
        onFinish={handleRecordFinish}
        onCancel={handleRecordCancel}
        modalMode={true} // 弹框模式
        triggerButton="开始录音" // 自定义触发按钮文本
      />
    </div>
  );
};

export default App;
```

## API 文档

### AudioRecorder Props

| 参数名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| maxDuration | number | 60 | 最大录音时长（秒） |
| onFinish | (filePath: string) => void | - | 录音完成回调，返回录音文件路径 |
| onCancel | () => void | - | 取消录音回调 |
| modalMode | boolean | false | 是否为弹框模式 |
| triggerButton | React.ReactNode | "开始录音" | 弹框模式下的触发按钮内容 |

## 组件结构

```
AudioRecorder06/
├── AudioRecorder.tsx  # 录音组件核心代码
├── index.less          # 组件样式文件
├── Example.tsx         # 组件使用示例
└── README.md           # 组件文档说明
```

## 浏览器兼容性

- Chrome 66+
- Firefox 65+
- Safari 14+
- Edge 79+

## 注意事项

1. **麦克风权限**：组件需要用户授权使用麦克风，请确保浏览器支持并正确配置麦克风权限。

2. **录音格式**：组件使用 `audio/webm;codecs=opus` 格式录制音频，这是现代浏览器支持的高效音频格式。

3. **临时文件**：录音完成后返回的是临时URL，浏览器会在页面刷新或关闭后释放该URL。如果需要长期保存录音文件，建议将其上传到服务器。

4. **移动端适配**：组件已针对移动端进行适配，支持触摸事件，但在某些移动浏览器中可能存在兼容性问题。

## 二次开发

### 1. 修改样式

组件样式使用Less编写，位于 `index.less` 文件中。您可以根据需要修改样式变量或类名。

### 2. 扩展功能

如果需要扩展组件功能，可以在 `AudioRecorder.tsx` 文件中修改或添加代码。例如：

- 添加录音质量设置
- 添加录音格式选择
- 添加录音波形可视化
- 添加录音上传功能

### 3. 自定义提示消息

组件使用Ant Design的 `message` 组件显示提示消息。如果需要自定义提示消息的样式或行为，可以修改 `showMessage` 方法。

## 测试

组件提供了完整的使用示例，位于 `Example.tsx` 文件中。您可以运行示例代码测试组件的各项功能。

## 许可证

MIT License
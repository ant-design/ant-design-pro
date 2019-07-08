---
order: 2
title: Failed
---

提交失败。

```jsx
import Result from 'ant-design-pro/lib/Result';
import { Button, Icon } from 'antd';

const extra = (
  <div>
    <div style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.85)', fontWeight: 500, marginBottom: 16 }}>
      您提交的内容有如下错误：
    </div>
    <div style={{ marginBottom: 16 }}>
      <Icon style={{ color: '#f5222d', marginRight: 8 }} type="close-circle" />
      您的账户已被冻结
      <a style={{ marginLeft: 16 }}>
        立即解冻 <Icon type="right" />
      </a>
    </div>
    <div>
      <Icon style={{ color: '#f5222d', marginRight: 8 }} type="close-circle" />
      您的账户还不具备申请资格
      <a style={{ marginLeft: 16 }}>
        立即升级 <Icon type="right" />
      </a>
    </div>
  </div>
);

const actions = <Button type="primary">返回修改</Button>;

ReactDOM.render(
  <Result
    type="error"
    title="提交失败"
    description="请核对并修改以下信息后，再重新提交。"
    extra={extra}
    actions={actions}
  />,
  mountNode
);
```

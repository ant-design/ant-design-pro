---
title: Login
subtitle: 登录
cols: 1
order: 15
---

支持多种登录方式切换，内置了几种常见的登录控件，可以灵活组合，也支持和自定义控件配合使用。

## API

### Login

| 参数             | 说明                    | 类型                  | 默认值 |
| ---------------- | ----------------------- | --------------------- | ------ |
| defaultActiveKey | 默认激活 tab 面板的 key | String                | -      |
| onTabChange      | 切换页签时的回调        | (key) => void         | -      |
| onSubmit         | 点击提交时的回调        | (err, values) => void | -      |

### Login.Tab

| 参数 | 说明             | 类型      | 默认值 |
| ---- | ---------------- | --------- | ------ |
| key  | 对应选项卡的 key | String    | -      |
| tab  | 选项卡头显示文字 | ReactNode | -      |

### Login.UserName

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 控件标记，提交数据中同样以此为 key | String | - |
| rules | 校验规则，同 Form getFieldDecorator(id, options) 中 [option.rules 的规则](getFieldDecorator(id, options)) | object[] | - |

除上述属性以外，Login.UserName 还支持 antd.Input 的所有属性，并且自带默认的基础配置，包括 `placeholder` `size` `prefix` 等，这些基础配置均可被覆盖。

## Login.Password、Login.Mobile 同 Login.UserName

### Login.Captcha

| 参数         | 说明                     | 类型                             | 默认值       |
| ------------ | ------------------------ | -------------------------------- | ------------ |
| onGetCaptcha | 点击获取校验码的回调     | () => (void \| false \| Promise) | -            |
| countDown    | 倒计时                   | number                           | -            |
| buttonText   | 点击获取校验码的说明文字 | ReactNode                        | '获取验证码' |

除上述属性以外，Login.Captcha 支持的属性与 Login.UserName 相同。

### Login.Submit

支持 antd.Button 的所有属性。

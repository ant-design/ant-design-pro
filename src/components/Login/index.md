---
title:
  en-US: Login
  zh-CN: Login
subtitle: 登录
cols: 1
order: 80
---

登录控件，支持自定义输入控件。

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
data | 类型及输入控件信息 | Array<{ loginType: String, key: String, inputControls: Array<{ key: String, type: Enum{'AutoComplete', 'Input', 'Select'} 或 Enum{'userName', 'password', 'mobile', 'captcha'} `后面几种为内置控件，若配置为这些选项，会自动包含默认的样式，校验规则及相关属性`, props: 各类控件支持的属性, rules: 同 [antd-form-rules](https://ant.design/components/form-cn/#校验规则) }> }> | -
activeKey | 当前激活 tab 面板的 key | String | -
notice | 提示信息，可用来展现服务端返回的报错，警告之类，会展示为 Alert 形式，位于输入控件上方 | 支持属性与 Alert 相同 | -
extra | 其他内容，位于提交按钮上方 | ReactNode | -
moreLoginTypes | 其他登录方式 | {title: ReactNode, types: ReactNode} | title 默认为 '其他登录方式'
register | 注册操作 | {title: ReactNode, href: String} | title 默认为 '注册账户'
onTabChange | 切换登录方式的回调 | (key) => void | -
onSubmit | 提交信息的回调 | (err, values) => void | -
onGetCaptcha | 点击获取校验码按钮的回调，仅当 inputControls 中包含 'captcha' 类型的控件时生效 | () => void | -

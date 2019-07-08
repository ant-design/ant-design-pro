---
title: Login
cols: 1
order: 15
---

Support multiple common ways of login with built-in controls. You can choose your own combinations and use with your custom controls.

## API

### Login

| Property         | Description                           | Type                  | Default |
| ---------------- | ------------------------------------- | --------------------- | ------- |
| defaultActiveKey | default key to activate the tab panel | String                | -       |
| onTabChange      | callback on changing tabs             | (key) => void         | -       |
| onSubmit         | callback on submit                    | (err, values) => void | -       |

### Login.Tab

| Property | Description               | Type      | Default |
| -------- | ------------------------- | --------- | ------- |
| key      | key of the tab            | String    | -       |
| tab      | displayed text of the tab | ReactNode | -       |

### Login.UserName

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| name | name of the control, also the key of the submitted data | String | - |
| rules | validation rules, same with [option.rules](getFieldDecorator(id, options)) in Form getFieldDecorator(id, options) | object[] | - |

Apart from the above properties, Login.Username also support all properties of antd.Input, together with the default values of basic settings, such as _placeholder_, _size_ and _prefix_. All of these default values can be over-written.

### Login.Password, Login.Mobile are the same as Login.UserName

### Login.Captcha

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| onGetCaptcha | callback on getting a new Captcha | () => (void \| false \| Promise) | - |
| countDown | count down | number | - |
| buttonText | text on getting a new Captcha | ReactNode | '获取验证码' |

Apart from the above properties, _Login.Captcha_ support the same properties with _Login.UserName_.

### Login.Submit

Support all properties of _antd.Button_.

---
order: 0
title: 基础样例 
---

简单的用户头像列表。

````jsx
import AvatarList from 'ant-design-pro/lib/AvatarList';

ReactDOM.render(
  <AvatarList size="small">
    <AvatarList.Item tips="Jake" src="https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png" />
    <AvatarList.Item tips="Andy" src="https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png" />
    <AvatarList.Item tips="Niko" src="https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png" />
  </AvatarList>
, mountNode);
````

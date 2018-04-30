import React from 'react';

const UrlMap = {
  sidemenu: {
    active: 'https://gw.alipayobjects.com/zos/rmsportal/WEqgEeCsLvecmwJwbhif.svg',
    default: 'https://gw.alipayobjects.com/zos/rmsportal/bjdhEDZlJzyMlyGbFQQd.svg',
    disable: 'https://gw.alipayobjects.com/zos/rmsportal/VeCtUculrOjKzkzSzrye.svg',
  },
  topside: {
    active: 'https://gw.alipayobjects.com/zos/rmsportal/RbntcRzDHttDvYfKxsPc.svg',
    default: 'https://gw.alipayobjects.com/zos/rmsportal/gqjBdnSHfVYIFvpGbLZV.svg',
    disable: 'https://gw.alipayobjects.com/zos/rmsportal/VlSlQQkUGdbcOZdbUgMp.svg',
  },
  topmenu: {
    active: 'https://gw.alipayobjects.com/zos/rmsportal/nWoQtAGvMihfwxKZEzAi.svg',
    default: 'https://gw.alipayobjects.com/zos/rmsportal/tbfuZcaGaYQGyeaiTaDg.svg',
    disable: 'https://gw.alipayobjects.com/zos/rmsportal/VYNKTivFAQOBBbZkkWNb.svg',
  },
};

const navState = ({ alt, type, state }) => {
  const url = UrlMap[type][state];
  return <img src={url} alt={alt} />;
};

export default navState;

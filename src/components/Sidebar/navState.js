import React from 'react';

const UrlMap = {
  sidemenu: {
    active:
      'http://alipay-os.oss-cn-hangzhou-zmf.aliyuncs.com/rmsportal/YcoRFFREHxmXebXryzhC.svg',
    default:
      'http://alipay-os.oss-cn-hangzhou-zmf.aliyuncs.com/rmsportal/FUcluUxklaHEgbCfosWO.svg',
    disable:
      'http://alipay-os.oss-cn-hangzhou-zmf.aliyuncs.com/rmsportal/nnbGSviuREntXtWJEquJ.svg',
  },
  topside: {
    active:
      'http://alipay-os.oss-cn-hangzhou-zmf.aliyuncs.com/rmsportal/cRVYqCCkknDizjyHpjgR.svg',
    default:
      'http://alipay-os.oss-cn-hangzhou-zmf.aliyuncs.com/rmsportal/ygeNiTUuhrHuNMjkVQkv.svg',
    disable:
      'http://alipay-os.oss-cn-hangzhou-zmf.aliyuncs.com/rmsportal/KtcgueNbQdMSbxGDigdT.svg',
  },
  topmenu: {
    active:
      'http://alipay-os.oss-cn-hangzhou-zmf.aliyuncs.com/rmsportal/RCtKLhlMLWYKaWDzLsBC.svg',
    default:
      'http://alipay-os.oss-cn-hangzhou-zmf.aliyuncs.com/rmsportal/pMRBYBPSKXgEGrglJsdl.svg',
    disable:
      'http://alipay-os.oss-cn-hangzhou-zmf.aliyuncs.com/rmsportal/PvQhRIcAGTKewuOfJOSn.svg',
  },
};

const navState = ({ alt, type, state }) => {
  const url = UrlMap[type][state];
  return <img src={url} alt={alt} />;
};

export default navState;

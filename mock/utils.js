export const imgMap = {
  user: 'https://gw.alipayobjects.com/zos/rmsportal/UjusLxePxWGkttaqqmUI.png',
  a: 'https://gw.alipayobjects.com/zos/rmsportal/ZrkcSjizAKNWwJTwcadT.png',
  b: 'https://gw.alipayobjects.com/zos/rmsportal/KYlwHMeomKQbhJDRUVvt.png',
  c: 'https://gw.alipayobjects.com/zos/rmsportal/gabvleTstEvzkbQRfjxu.png',
  d: 'https://gw.alipayobjects.com/zos/rmsportal/jvpNzacxUYLlNsHTtrAD.png',
};

// refers: https://www.sitepoint.com/get-url-parameters-with-javascript/
export function getUrlParams(url) {
  const d = decodeURIComponent;
  let queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  const obj = {};
  if (queryString) {
    queryString = queryString.split('#')[0];
    const arr = queryString.split('&');
    for (let i = 0; i < arr.length; i += 1) {
      const a = arr[i].split('=');
      let paramNum;
      const paramName = a[0].replace(/\[\d*\]/, (v) => {
        paramNum = v.slice(1, -1);
        return '';
      });
      const paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
      if (obj[paramName]) {
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = d([obj[paramName]]);
        }
        if (typeof paramNum === 'undefined') {
          obj[paramName].push(d(paramValue));
        } else {
          obj[paramName][paramNum] = d(paramValue);
        }
      } else {
        obj[paramName] = d(paramValue);
      }
    }
  }
  return obj;
}

export default {
  getUrlParams,
  imgMap,
};

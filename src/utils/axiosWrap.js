import axios from 'axios';

/* 创建一个新的 AXIOS 对象，确保原有的对象不变 */
const axiosWrap = axios.create({
  headers: {
    /* 一些公用的 header */
    'content-type': 'application/json',
  },
  // transformRequest:[function (data, header){
  //   /* 自定义请求参数解析方式（如果必要的话） */
  // }],
  // paramsSerializer:function(params){
  //   /* 自定义链接参数解析方式（如果必要的话） */
  // }
});

/* 过滤请求 */
axiosWrap.interceptors.request.use(config => config);
/* 过滤响应 */
axiosWrap.interceptors.response.use((result) => {
  console.info("interceptors");
  console.info(result);
  /* 假设当code为0时代表响应成功 */
  if (result.data.status !== 200) {
    return Promise.reject(result)
  }
  return result;
}, (error) => {
  console.info("interceptors exception");
  console.info(error);
  return Promise.reject(error)
});

export default axiosWrap;

import axios from 'axios'

/* 创建一个新的 AXIOS 对象，确保原有的对象不变 */
let axiosWrap = axios.create({
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
axiosWrap.interceptors.request.use((config) => {
  return config
});
/* 过滤响应 */
// axiosWrap.interceptors.response.use((result) => {
//   /* 假设当code为0时代表响应成功 */
//   if (result.data.code !== 0) {
//     return Promise.reject(result)
//   }
//   return result.data.data
// }, result => {
//   return Promise.reject(result)
// });

export default axiosWrap

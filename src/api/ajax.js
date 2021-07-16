// 封装能发ajax请求的函数，向外暴露的本质是axios
// 1. 统一处理请求异常
// 2. 异步请求成功的数据不是response，而是response.data
// 3. 解决post请求携带参数的问繁体：默认是jason，需要转换成urlencode的形式

import axios from 'axios'
// import qs from 'qs'
// 转换格式
import { message } from 'antd'

// 添加请求拦截器，让post请求的请求体格式为urlencoded格式 即a=1&b=2
// 在真正发请求之前
// axios.interceptors.request.use((config) => {
//     //得到请求方式和请求体数据
//     const { method , data } = config     
//     //处理post请求，将data对象转换为query参数格式的字符串
//     if (method.toLowerCase() === 'get' && typeof data === 'object')
//     {
//         config.data = qs.stringify(data)
//     }
//     return config;
// });
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 可加入筛选条件
    // const { method , data } = config
    // if (method.toLowerCase() === 'get' )
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


//添加响应拦截器,字打错，要注意！！！
// 功能1：让请求成功的结果不再是response，而是response.data（）
// 统一处理所有请求的异常错误
// 在请求返回之后且在我们指定的请求响应回调函数之前
// //统一处理所有请求的异常错误
axios.interceptors.response.use(function(response){
// // 返回的结果就会交给指定的请求拦截器
    return response.data;
},function (error){
    message.error ('请求出错'+ error.message )
    //返回一个pending状态的promise，中断promise链
    return new Promise (() => {})
});

export default axios
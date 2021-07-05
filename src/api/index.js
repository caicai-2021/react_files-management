//包含应用中所有请求接口的函数：接口请求函数
//函数的返回值都是promise对象
// import { message } from 'antd';
import ajax from './ajax'


// 登录请求,经过ajax文件配置之后，可以放心传输对象
//ajax函数后面应该跟小括号，表示回调的作用
//将登录程序封装在index文件中

//加入箭头函数，使得数值可以进一步传递
// export const reqLogin = (value) => (
//   ajax({
//     method: 'post',
//     url: '/login_test',
//     data: {
//       value
//     }
//   })
//   )
  export const reqLogin = (value) => ajax.post('/login_test',{value})

  // .then(function (response) {
  //   console.log(response.data);
  //   console.log(response.status);
  //   if (response.data.state === 0 ) 
  //       {
  //         message.success('登录成功！')
  //         return 1
  //       }
  //       else
  //       {
  //         message.error(response.data.msg)
  //         return 0
  //       }
  // });

// export const reqLogin = (user_number , password) => (ajax({
//     method: 'post',
//     url: '/login_test',
//     data: {
//       user_number,
//       password
//     }
    
//   }));
// => ajax.post('url',{user_name,password})


export const reqRegister = (value) => ajax.post('/Register_test',{value})

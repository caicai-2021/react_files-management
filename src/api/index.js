//包含应用中所有请求接口的函数：接口请求函数
//函数的返回值都是promise对象
// import { message } from 'antd';
import ajax from './ajax'

// jsonp请求没法ajax发送
import jsonp from 'jsonp'
// import { reject, resolve } from 'q'
import { message } from 'antd'


// 登录请求,经过ajax文件配置之后，可以放心传输对象
//ajax函数后面应该跟小括号，表示回调的作用
//将登录程序封装在index文件中

//加入箭头函数，使得数值可以进一步传递
  export const reqLogin = (value) => ajax.post('/login_test',{value})

// export const reqLogin = (user_number , password) => (ajax({
//     method: 'post',
//     url: '/login_test',
//     data: {
//       user_number,
//       password
//     }
    
//   }));
// => ajax.post('url',{user_name,password})

// 登记请求接口
export const reqRegister = (value) => ajax.post('/Register_test',{value})

// 发送jsonp请求得到天气信息
export const reqWeather =() =>{
  return new Promise ((resolve,reject)=>{
    // 执行器执行异步函数，成功resolve（），失败reject（）
    // 直接提示错误信息
    const url = `https://wis.qq.com/weather/common?source=pc&weather_type=forecast_24h&province=北京&city=北京&country=海淀`
    jsonp(url,{},(error,data) => {
      if (! error && data.status === 200){
        // 成功的
        const {day_weather,max_degree,min_degree}=data.data.forecast_24h[1]
        // console.log({day_weather,max_degree,min_degree})
        // 传两个数据的话需要用到花括号，打包
        resolve({day_weather,max_degree,min_degree})
      }
      else{
        message.error('获取天气信息失败')
      }
  })
  })
}

// 发送获取信息表格总数据的请求
export const reqList = () => ajax.post('/getList')

export const reqDel = (value) => ajax.post('/ListDelect',{value})

// 修改信息
export const reqEditForm =(value) => ajax.post('/InfoEdit',{value})

// 上传thesis
export const reqUploadThesis =(value) => ajax.post('/thesis_upload',{value})
// 显示thesis列表
export const reqThesisList = () => ajax.post('/ThesisList')
//上传paper
export const reqUploadPaper =(value) => ajax.post('/paper_upload',{value})
// 显示tpaper列表
export const reqPaperList = () => ajax.post('/paper_list')

//上传ppt
export const reqUploadPpt =(value) => ajax.post('/ppt_upload',{value})
// 显示ppt列表
export const reqPptList = () => ajax.post('/ppt_list')

// 修改用户权限
export const reqAuth =({type,number}) => ajax.post('/Auth',{type,number})

export const reqTyper =() => ajax.get('/type_user')

export const reqTimer =() => ajax.get ('/date_list')
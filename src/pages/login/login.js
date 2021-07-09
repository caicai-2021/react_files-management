import React, { Component } from 'react';
import { Form, Input, Button, message  } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './login.css';//css里进行编译，lcss无法进行转换
import logo from '../../assets/images/logo.jpg'
//引入接口请求函数
import { reqLogin } from '../../api';
import { Redirect } from 'react-router-dom';

import storageUtils from '../../utils/storageUtils';

import memoryUtils from '../../utils/memoryUtils';

//定义一个异步处理函数，await处理返回值
//学会this的使用

export default class Login extends Component {
    
 onFinish = (value) => {
        console.log('Received values of form: ');
        console.log(value);
        this.getpromise(value);
    }

    async  getpromise(data) {
        const result = await reqLogin (data);
        console.log(result);
       
        if (result.state === 0) {
            // 将登录成功的结果返回保存在本地的user中，将其设立一个item，k-v对应，将json格式的字符串化
            //在调用的时候可以使用对象化
            const user = result.list
            // localStorage.setItem('user_key',JSON.stringify(user))
            // 在local中保存一份
            storageUtils.saveUser(user)
            // 内存里也需要进行保存
            // 两种情况内存会有，登录过/或者登录输入
            // 这是也不需要从storage中读，只需要从内存中调用即可
            memoryUtils.user = user
            this.props.history.replace("/")
            message.success('登录成功！')
        }
        else
        {
            message.error(result.msg)
        }
    }
    render()  {
        //判定界面的显示情况，记得写在render中
        //读取保存的user，如果存在，直接跳转到管理界面
        //读取储存的user，如果里面有字符就读取，没有的话就读取空
        //使用是json序列化
        //如果不了解基本方法的话，去mdn中去查找
        // const user = JSON.parse(localStorage.getItem('user_key') || '{}')
        const user = memoryUtils.user
        if (user.name){
        // this.props.history.replace('/login')
        //该方法不能再render中直接使用，一般用在事件回调函数中进行路由跳转
        //需要import redirect 一种特殊的组件，可以自己实现路由跳转
            return <Redirect to ='/admin'/>
        }

        return (    
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>文件管理系统</h1>
                </div>

                <div className="login-content">
                    <h2>用户登录</h2>
                    
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        >
                            <Form.Item
                                name="user_number"
                                rules={[
                                {required: true, whitespace: true, message: '请输入用户名！',},
                                {max: 12 , message: '最大长度不能超过12位'},
                                ]}
                            >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                            </Form.Item>

                            <Form.Item
                            name="password"
                            rules={[
                            { required: true, whitespace: true,  message: '请输入你的密码！', },
                            
                            ]}
                            >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                            />
                            </Form.Item>
      

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                登 录
                                </Button>
                                <a href="/register">register now!</a>
                            </Form.Item>
                    </Form>
                </div>
            </div>
            
            )  
                      
    }
}
    

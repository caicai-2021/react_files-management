import React, { Component } from 'react';
import { Form, Input, Button, message  } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './login.css';//css里进行编译，lcss无法进行转换
import logo from './images/logo.jpg';
//引入接口请求函数
import { reqLogin } from '../../api';

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
            this.props.history.replace("/admin")
            message.success('登录成功！')
        }
        else
        {
            message.error(result.msg)
        }
    }
   
    render()  {

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
                            </Form.Item>
                    </Form>
                </div>
            </div>
            
            )  
                      
    }
}
    

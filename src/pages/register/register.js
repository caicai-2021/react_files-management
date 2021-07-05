import React, { Component } from 'react';
import { Form, Input, Select, Row, Col, Button, message, } from 'antd';
import "./register.css"
import { reqRegister } from '../../api';
import { Redirect } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';

const { Option } = Select;
const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
        offset : 0 ,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 8,
      },
      sm: {
        span: 18,
        offset: 4,
      },
    },
  };


// import './register.css';//css里进行编译，lcss无法进行转换

export default class Register extends Component{
  
    onFinish = (values) => {
        console.log('Received values of form: ', values);
        this.Getpromise(values);
      };

// 发送注册通讯请求
    async Getpromise (data) {
        const result = await reqRegister (data);
        console.log(result);
        if (result.status === 0 )
        {message.success(result.msg)}
        // 判定成功，跳转登录界面
        this.props.history.replace('/login')
    }

    render () {
        //进行判定如果已经登录，就跳转到管理界面 
        const user = memoryUtils.user
        if (user.name){
            return <Redirect to ='/admin'/>
        }
        
        return (
            <div className = "register_back">
                <div>
                <h1>header</h1>
                </div>
                <div className = "register_content">
                <h2>Register</h2>
                                <Form
                    {...formItemLayout}

                    name="register"
                    onFinish={this.onFinish}
                    scrollToFirstError
                    >
                    <Form.Item
                    name = "user_number"
                    label = "学号/工号"
                    tooltip="这是你的用户名，请牢记哦！"
                    rules={[
                        {
                             // 这是必填项
                            required: true , 
                           
                            message : '这是必填项',
                            // 空格不允许
                            whitespace: true,
                            
                        }
                    ]}
                    >
                    <Input/>

                    </Form.Item>

                    <Form.Item
                        name="user_type"
                        label="用户类型"
                        rules={[
                        {
                            required: true,
                            message: '必填',
                        },
                        ]}
                    >
                        <Select placeholder="select your identity">
                        <Option value="0">管理员</Option> 
                        <Option value="1">老师</Option>
                        <Option value="2">学生</Option>
                        </Select>
                    </Form.Item>


                    <Form.Item
                        name="name"
                        label="姓名"
                        rules={[
                        {
                            required: true,
                            message: '姓名必填哦！',
                            whitespace: true,
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="mail"
                        label="常用邮箱"
                        rules={[
                        {
                            type: 'email',
                            message: '这不是合法邮箱',
                        },
                        {
                            required: true,
                            message: '请输入你的邮箱！',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[
                        {
                            required: true,
                            message: '密码一定要有哦！',
                        },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm_password"
                        label="确认密码"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: '请确认一下密码',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('两次输入不一致'));
                            },
                        }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                  

                    <Form.Item
                        name="residence"
                        label="家庭住址"
                        rules={[
                        {
                            required: true,
                            message: '请输入家庭地址',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="office"
                        label="办公地址"
                        rules={[
                        {
                            required: true,
                            message: '请输入常用办公地址',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="联系电话"
                        rules={[
                       
                        {
                            required: true,
                            message: '这样大家会无法和你联系哦',
                        },
                      
                        {
                            len : 11,
                            message: '输入移动电话',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="dorm"
                        label="宿舍地址"
                        tooltip="没有请填无"
                        rules={[
                        {
                            required: true,
                            whitespace: true
                        }
                        ]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        name="gender"
                        label="性别"
                        rules={[
                        {
                            required: true,
                            message: '必填',
                        },
                        ]}
                    >
                        <Select placeholder="select your gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="验证码" extra="We must make sure that your are a human.">
                        <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                            name="captcha"
                            noStyle
                            rules={[
                                {
                                required: true,
                                message: 'Please input the captcha you got!',
                                },
                            ]}
                            >
                            <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Button>Get captcha</Button>
                        </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className = "register-button">
                        点击注册
                        </Button>
                    </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
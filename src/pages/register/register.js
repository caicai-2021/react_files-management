import React, { Component } from 'react';
import { Form, Input, Select, Row, Col, Button, message, } from 'antd';
import "./register.css"
import { reqRegister } from '../../api';
import { Redirect } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
            offset: 0,
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

export default class Register extends Component {

    onFinish = (values) => {
        console.log('Received values of form: ', values);
        this.Getpromise(values);
    };

    // 发送注册通讯请求
    async Getpromise(data) {
        const result = await reqRegister(data);
        console.log(result);
        if (result.status === 0) { message.success(result.msg) }
        // 判定成功，跳转登录界面
        this.props.history.replace('/login')
    }

    render() {
        // 进行判定如果已经登录，就跳转到管理界面 
        const user = memoryUtils.user
        if (user.name) {
            return <Redirect to='/admin' />
        }

        return (
            <div className="register_back">
                <div className="register_content">
                    {/* <h2 className ="h2">注   册</h2> */}
                    <Form
                        {...formItemLayout}

                        name="register"
                        onFinish={this.onFinish}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="user_number"
                            label="学号/工号"
                            tooltip="这是你的用户名，请牢记哦！"
                            rules={[
                                {
                                    // 这是必填项
                                    required: true,
                                    message: '这是必填项',
                                    // 空格不允许
                                    whitespace: true,
                                }
                            ]}
                        >
                            <Input />

                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="姓名"
                            tooltip="请如实填写！不可修改"
                            rules={[
                                {
                                    // 这是必填项
                                    required: true,
                                    message: '这是必填项',
                                    // 空格不允许
                                    whitespace: true,
                                }
                            ]}
                        >
                            <Input />

                        </Form.Item>
                        <Form.Item
                            name="tutor"
                            label="导师"
                            tooltip="请如实填写！"
                            rules={[
                                {
                                    // 这是必填项
                                    required: true,
                                    message: '这是必填项',
                                    // 空格不允许
                                    whitespace: true,
                                }
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
                            <Button type="primary" htmlType="submit" className="register-button">
                                点击注册
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
import React, { Component } from 'react'
import { Form, Input, Select, Button, Upload, message, Modal } from 'antd'
import PropTypes from 'prop-types'
import memoryUtils from '../../utils/memoryUtils';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
// 引入photo组件
import PhotoData from './photoData';


const { Option } = Select;
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
const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
};
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {

      message.error('只能上传 JPG/PNG 文件!');
    //  强制退出，解决
      return Upload.LIST_IGNORE
    }
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      message.error('图像必须小于 1MB!');
      return Upload.LIST_IGNORE
    }
    return isJpgOrPng && isLt2M;
  }
  function onPreview (file) {
    let src = file.thumbUrl;
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };


// 修改信息的form组件
// 组件相等于函数，声明属性之后又变成对象，现在是函数对象
export default class EditForm extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        imageUrl: '',
        previewTitle: '',
        fileList: [],
    };
    // 目的是创造一个user，能够更新图片状态
     user = memoryUtils.user
    //  this.setState{(fileList:[user.photo_data])}

    //   handleChange = ({ fileList }) => this.setState({ fileList });
    handleChange = info => {
        // debugger
        // 得到一个uploading的文件
        // console.log(info, info.file)
        // 进入下面的判断条件
        
        if (info.file.status === 'uploading') {
            // this.setState({ loading: true });
            // getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
                // imageUrl,
                // loading: false,
                fileList: [info.file]
            });
            // );
            // debugger
            info.file.status = 'done'
            return;
        }
        if (info.file.status === 'removed') {
            // Get this url from response in real world.
            // getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    fileList:[]
                });
            // );
        }
        // style={{ marginTop: 8 }}
    };
    
    //定义一个获取值的函数
    formRef = React.createRef();

    onFinish = (values) => {
        console.log('Received values of form: ', values);
        console.log(this.formRef.current.getFieldsValue())
    }
    // 不加static是给组件对象进行添加，加是给类对象函数添加属性，声明一个属性（该属性是一个函数，传给父组件）
    static propTypes = {
        setForm: PropTypes.func.isRequired
    };

    save = () => {
        // 将子组件的参数对象交给了父组件
        this.props.setForm(this.formRef.current.getFieldsValue())
    }
    render() {
        const { fileList} = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );

        const user = memoryUtils.user


        return (

            <Form  {...formItemLayout}
                // name="register"
                onFinish={this.onFinish}
                ref={this.formRef}
                scrollToFirstError>
                <Form.Item
                    name="user_number"
                    label="学号/工号"
                    tooltip="这是你的用户名，请牢记哦！"
                    initialValue={user.user_number}
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
                    name="user_type"
                    label="用户类型"
                    initialValue={user.user_type}
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
                    initialValue={user.name}
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
                    initialValue={user.mail}
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
                    initialValue={user.confirm_password}
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
                    initialValue={user.confirm_password}
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
                    initialValue={user.residence}
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
                    initialValue={user.office}
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
                    initialValue={user.phone}
                    rules={[

                        {
                            required: true,
                            message: '这样大家会无法和你联系哦',
                        },

                        {
                            len: 11,
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
                    initialValue={user.dorm}
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
                    initialValue={user.gender}
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
                <Form.Item
                    name="photo_data"
                    label="头像"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: '必填',
                    //     },
                    // ]}
                    getValueFromEvent={normFile}
                    valuePropName="fileList"
                // wrapperCol={{ span: 12, offset: 6 }}
                >
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        customRequest={() => false}
                       
                        beforeUpload={beforeUpload}
                        onPreview ={onPreview}
                        
                        onChange={this.handleChange}>
                      
                        {this.state.fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    
                </Form.Item>
                <Button type="primary" htmlType="submit" onClick={this.save}>
                    保存
                </Button>
            </Form>


        )
    }
}


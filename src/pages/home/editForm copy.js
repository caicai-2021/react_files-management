import React, { Component } from 'react'
import { Form, Input, Select, Row, Col, Button, Modal, message,Upload } from 'antd'
import PropTypes from 'prop-types'
import { UploadOutlined, LoadingOutlined, PlusOutlined, LineHeightOutlined } from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils';
import resolve from 'resolve';
// 定义minio的服务代理
var Minio = require('minio')

var client = new Minio.Client({
    endPoint: '127.0.0.1',
    port: 9000,
    useSSL: false,
    accessKey: 'admin',
    secretKey: '123456789'
});

//准备上传
// client.fPutObject('photos', option.file.name, option.filename, function (err, etag) {
//     // return console.log(err, etag) {
//     if (err) {
//         // message.success("上传成功")
//         return console.log(err)
//     }
//     message.success("上传成功")

// })

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

  
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// 修改信息的form组件
export default class EditForm extends Component {
    state = {
        loading: false,
        imageUrl: '',
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: []
    };
    // crs(option,cal=>{console.log(cal)})
    

    // // // 上传文件
    upload(file, callback) {
        // console.log(option)
        let fr = new FileReader();//用FileReader 读取文件流
            fr.readAsArrayBuffer(file);
            // const m =
            fr.addEventListener("loadend", e => {
                debugger
                //e.target.result 就是读取到的文件流 将其转为Buffer类型即可 
                client.putObject('photos', file.name, new Buffer(e.target.result), file.size, callback(file.name)
                )})}
       
    // 不加static是给组件对象进行添加，加是给类对象函数添加属性
    static propTypes = {
        setForm: PropTypes.func.isRequired
    };


    handlePreview = async file => {
        debugger
        // console.log(file)
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };
    // handleChange = ({file, fileList }) => {
    //     console.log(file,fileList)
    //     this.setState({ fileList })
    // };
     onChange = async info => {
        // const { dispatch } = this.props;
        // const that = this;
        debugger
        console.log(info,info.file)
        // const result = await this.upload(info.file.originFileObj, res => {
        //         // 输出url
        //         // message.success(`${info.file.name}文件上传成功`);
        //         // const params = {
        //         //   url: res,
        //         //   key: that.state.uploadKey
        //         // }    
        //         console.log(res);
        //         // dispatch(RESOURCES_UPLOAD(params))
        //     });
        //     console.log(info,info.file)
        if (info.file.status === 'uploading') {
            this.upload(info.file.originFileObj, res => {
                debugger
                console.log(res);
                info.file.status = 'done'
                message.success(`${info.file.name}文件上传成功`);
            });
            console.log(info,info.file)
        }
    };

    // componentWillMount() {
    //     // 将子组件的参数交给了父组件
    //     this.props.setForm(this.props.form)
    // }
    render() {
        const user = memoryUtils.user
        // const {getfieldDecorator }=this.props.form
        const { loading, imageUrl } = this.state;
        const { previewVisible, fileList, previewTitle } = this.state;
        const uploadProps = {
            name: 'file',
            headers: {
              authorization: 'authorization-text',
            },
            onChange: this.onChange,
          };
        console.log(imageUrl, fileList)
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>头像上传</div>
            </div>
        );

        return (
            <div>
                <Form  {...formItemLayout}
                    // name="register"
                    onFinish={this.onFinish}
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
                </Form>
                <Upload
    //             name='file'
    // //   headers= {
    // //     authorization: 'authorization-text',
    // //   }this.upload
                    customRequest={()=>false}
                    // beforeUpload={this.beforeUpload}
                listType="picture-card"
    //                 // fileList={fileList}
    //             onPreview={this.handlePreview}
    //             // maxCount = '1'
                onChange={this.onChange}
    // {...uploadProps}
                >
                {/* {fileList.length >= 1 ? null : uploadButton} */}
                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                </Upload>
            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={this.handleCancel}
            >
                <img src={imageUrl} alt="example" style={{ width: '100%' }} />
            </Modal>
            </div >
        )
    }
}


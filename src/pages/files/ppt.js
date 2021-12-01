import React, { Component } from 'react'
import { Form, Upload, Divider, Input, Card, Select, Button, DatePicker, message } from 'antd'
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { reqUploadPpt } from '../../api';

var Minio = require('minio')

var client = new Minio.Client({
    endPoint: '10.23.197.77',
    port: 9000,
    useSSL: false,
    accessKey: 'admin',
    secretKey: '123456789'
});

const { Option } = Select;
let index = 0;

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};


const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
}

export default class PPT extends Component {
    state = {
        items: ['组会汇报', '答辩展示', '项目总结'],
        name: '',
    };

    // 上传文件
    upload(file, callback) {
        let fr = new FileReader();//用FileReader 读取文件流
        fr.readAsArrayBuffer(file);
        fr.addEventListener("loadend", e => {
            // debugger
            //e.target.result 就是读取到的文件流 将其转为Buffer类型即可 
            client.putObject('photos', file.name, new Buffer(e.target.result), file.size, callback(file.name)
            )
        })
    }
    // 通过控制change函数来上传文件
    onChange = info => {
        // debugger
        if (info.file.status === 'uploading') {
            this.upload(info.file.originFileObj, res => {
                // debugger
                console.log(res);
                info.file.status = 'done'
                message.success(`${info.file.name}文件上传成功`);
            });
            console.log(info, info.file)
        }
    };

    onFinish = (values) => {
        console.log('Received values of form: ', values);
        this.upppt(values)
        this.props.history.replace("/result")
    };

    async  upppt(data) {
        const result = await reqUploadPpt (data);
        console.log(result);
       
        if (result.state === 0) {
      
            message.success(result.msg)
        }
        else
        {
            message.error(result.msg)
        }
    }


    onNameChange = event => {
        this.setState({
            name: event.target.value,
        });
    };

    addItem = () => {
        console.log('addItem');
        const { items, name } = this.state;
        this.setState({
            items: [...items, name || `New item ${index++}`],
            name: '',
        });
    };

    render() {
        const { items, name } = this.state;

        return (
            <Card title="上传表单" bordered >
                <Form
                    name="validate_other"
                    {...formItemLayout}
                    onFinish={this.onFinish}
                    initialValues={{
                        'input-number': 3,
                        'checkbox-group': ['A', 'B'],
                        rate: 3.5,
                    }}
                >
                    <Form.Item
                        name="select"
                        label="文件类型"
                        hasFeedback
                        rules={[{ required: true }]}
                    >
                        <Select
                            style={{ width: 240 }}
                            placeholder="请选择/自定义"
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                        <Input style={{ flex: 'auto' }} value={name} onChange={this.onNameChange} />
                                        <a
                                            style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                            onClick={this.addItem}
                                        >
                                            <PlusOutlined /> 新增条目
                                        </a>
                                    </div>
                                </div>
                            )}
                        >
                            {items.map(item => (
                                <Option key={item}>{item}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="name" label="文件名" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="author" label="作者" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="tutor" label="导师" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="time" label="展示时间" rules={[{ required: true }]} >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item name="introduction" label="文件描述" rules={[{ required: true }]} >
                        <Input.TextArea showCount maxLength={100}
                            placeholder="给文件加个简短的描述吧，方便日后查找哦！"
                            autoSize={{ minRows: 3, maxRows: 5 }} />
                    </Form.Item>

                    <Form.Item label="上传框" rules={[{ required: true }]} >
                        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile}  rules={[{ required: true,message:'请上传'}]}>
                            <Upload.Dragger name="files"
                                customRequest={() => false}
                                onChange={this.onChange}
                                beforeUpload={this.beforeUpload}
                                onRemove={false}
                                maxCount={1}
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">点击或拖拽至此上传</p>
                                <p className="ant-upload-hint">支持文件5TB以下哦</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="primary" htmlType="submit">
                            确认上传
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

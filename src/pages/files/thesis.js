import React, { Component } from 'react'
import { Form, Upload, Input, Card, Button, Radio, DatePicker, message} from 'antd'
import { InboxOutlined } from '@ant-design/icons';
import { reqUploadThesis } from '../../api';


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
  };

var Minio = require('minio')

var client = new Minio.Client({
    endPoint: '127.0.0.1',
    port: 9000,
    useSSL: false,
    accessKey: 'admin',
    secretKey: '123456789'
});

export default class Thesis extends Component {
    // 上传文件前弹出对话框是否确认上传=》再议

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
            console.log(info,info.file)
        }
    };
   onFinish = (values) => {
        console.log('Received values of form: ', values);
        this.upthesis(values);
        this.props.history.replace("/result")
    };

    async  upthesis(data) {
        const result = await reqUploadThesis (data);
        console.log(result);
       
        if (result.state === 0) {
      
            message.success(result.msg)
        }
        else
        {
            message.error(result.msg)
        }
    }

    render() {
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

                    <Form.Item name="name" label="中文题目" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="author" label="作者" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="tutor" label="导师" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    {/* <Form.Item name="radio_group" label="文件格式" rules={[{ required: true }]} >
                        <Radio.Group>
                            <Radio value="a">pdf便携式文档</Radio>
                            <Radio value="b">doc文字文档</Radio>
                            <Radio value="c">zip压缩包</Radio>
                        </Radio.Group>
                    </Form.Item> */}

                    <Form.Item name="gradu_time" label="毕业时间" rules={[{ required: true }]} >
                        <DatePicker picker="month" />
                    </Form.Item>

                    <Form.Item label="上传框" rules={[{ required: true }]} >
                        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile}  rules={[{ required: true,message:'请上传'}]}>
                            <Upload.Dragger name="files"
                                customRequest={() => false}
                                onChange={this.onChange}
                                beforeUpload={this.beforeUpload}
                                onRemove = {false}
                                maxCount = {1}
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

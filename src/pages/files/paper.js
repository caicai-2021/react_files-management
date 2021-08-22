import React, { Component } from 'react'
import { Form, Upload,  Input,  Card, Button, Radio, DatePicker } from 'antd'
import {  InboxOutlined } from '@ant-design/icons';


const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};
const onFinish = (values) => {
    console.log('Received values of form: ', values);
};

const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }
}

export default class Paper extends Component {

    render() {

        return (

            <Card title="上传表单" bordered >
                <Form
                    name="validate_other"
                    {...formItemLayout}
                    onFinish={onFinish}
                    initialValues={{
                        'input-number': 3,
                        'checkbox-group': ['A', 'B'],
                        rate: 3.5,
                    }}
                >
                    <Form.Item name="paper_name" label="期刊名"  rules={[{ required: true}]} >
                        <Input />
                    </Form.Item>

                    <Form.Item name="paper_number" label="期刊号" rules={[{ required: true}]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="nameCN" label="中文题目" rules={[{ required: true}]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="nameEN" label="英文题目" rules={[{ required: true}]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="first_author" label="第一作者" rules={[{ required: true}]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="authors" label="所有作者" rules={[{ required: true}]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="Co_author" label="通讯作者" rules={[{ required: true}]} >
                        <Input />
                    </Form.Item>

                    <Form.Item name="tutor" label="导师" rules={[{ required: true}]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="first_ack" label="第一标注基金号" rules={[{ required: true}]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="radio-group" label="文件格式"rules={[{ required: true}]} >
                        <Radio.Group>
                            <Radio value="a">pdf便携式文档</Radio>
                            <Radio value="b">doc文字文档</Radio>
                            <Radio value="c">zip压缩包</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="pub_time" label="发表时间" rules={[{ required: true}]} >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item label="上传框"  rules={[{ required: true}]} >
                        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                            <Upload.Dragger name="files" action="/upload.do" >
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

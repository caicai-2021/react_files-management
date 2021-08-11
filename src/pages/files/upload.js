import React, { Component } from 'react'
import './upload.css'
import { Form, Upload, Select, Input, Divider, Card, Button, Radio, Tag } from 'antd'
import { UploadOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { TweenOneGroup } from 'rc-tween-one';

const { Option } = Select;

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

export default class FileUpload extends Component {
    state = {
        tags: ['Tag 1', 'Tag 2', 'Tag 3'],
        inputVisible: false,
        inputValue: '',
    };

    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    saveInputRef = input => {
        this.input = input;
    };

    forMap = tag => {
        const tagElem = (
            <Tag
                closable
                onClose={e => {
                    e.preventDefault();
                    this.handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{ display: 'inline-block' }}>
                {tagElem}
            </span>
        );
    };

    render() {
        const { tags, inputVisible, inputValue } = this.state;
        const tagChild = tags.map(this.forMap);
        return (

            <Card title="上传表格" bordered >
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
                    <Form.Item
                        name="select"
                        label="文件类型"
                        hasFeedback
                        rules={[{ required: true, message: '请选择上传文件的类型' }]}
                    >
                        <Select placeholder="点击选择">
                            <Option value="0">组会记录</Option>
                            <Option value="1">项目总结</Option>
                            <Option value="2">实验计划</Option>
                            <Option value="3">发表论文</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="radio-group" label="文件格式">
                        <Radio.Group>
                            <Radio value="a">pdf便携式文档</Radio>
                            <Radio value="b">ppt演示文稿</Radio>
                            <Radio value="c">doc文字文档</Radio>
                            <Radio value="d">zip压缩包</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="paper_name" label="期刊名">
                        <Input />
                    </Form.Item>
                    <Form.Item name="paper_number" label="期刊号">
                        <Input />
                    </Form.Item>
                    <Form.Item name="note" label="标记">
                        <TweenOneGroup
                            enter={{
                                scale: 0.8,
                                opacity: 0,
                                type: 'from',
                                duration: 100,
                                onComplete: e => {
                                    e.target.style = '';
                                },
                            }}
                            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                            appear={false}
                        >
                            {tagChild}
                        </TweenOneGroup>

                        {inputVisible && (
                            <Input
                                ref={this.saveInputRef}
                                type="text"
                                size="small"
                                style={{ width: 78 }}
                                value={inputValue}
                                onChange={this.handleInputChange}
                                onBlur={this.handleInputConfirm}
                                onPressEnter={this.handleInputConfirm}
                            />
                        )}
                        {!inputVisible && (
                            <Tag onClick={this.showInput} className="site-tag-plus">
                                <PlusOutlined /> New Tag
                            </Tag>
                        )}
                    </Form.Item>
                    <Form.Item name={['user', 'introduction']} label="文件描述" >
                        <Input.TextArea showCount maxLength={100}
                            placeholder="给文件加个简短的描述吧，方便日后查找哦！"
                            autoSize={{ minRows: 3, maxRows: 5 }} />
                    </Form.Item>
                    <Form.Item label="上传框">
                        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                            <Upload.Dragger name="files" action="/upload.do">
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
                        Submit
                    </Button>
                    </Form.Item>
                </Form>
            </Card>

        )
    }
}

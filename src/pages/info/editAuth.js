import React, { Component } from 'react'
import { Form, Select, Button } from 'antd';
import PropTypes from 'prop-types'

const { Option } = Select;
export default class EditAuth extends Component {
    //定义一个获取值的函数
    formRef = React.createRef();
    onFinish = values => {
        console.log('Received values of form: ', values);
        console.log(this.formRef.current.getFieldsValue())
    };
    save = () => {
        // 将子组件的参数对象交给了父组件
        this.props.setForm(this.formRef.current.getFieldsValue())
    }
    // componentWillMount() {
    //     // 将form对象通过setForm()传递父组件
    //     this.props.setForm(this.formRef.current.getFieldsValue())
    // }

    static propTypes = {
        type: PropTypes.string,
        setForm: PropTypes.func.isRequired
    };
    render() {
        const { type } = this.props
        this.type = type

        // const { getFieldDecorator } = this.props.form
        return (

            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                // 传递数据的重要一步
                ref={this.formRef}
                onFinish={this.onFinish}

            // onFinishFailed={onFinishFailed}
            // autoComplete="off"
            >
                <Form.Item
                    name="user_type"
                    label="用户类型"
                    // initialValue={type}
                    rules={[
                        {
                            required: true,
                            message: '必填',
                        },
                    ]}
                >
                    <Select placeholder="select your identity" >
                        <Option value="0">管理员</Option>
                        <Option value="1">用户</Option>
                        <Option value="2">待审核</Option>
                        <Option value="3">已离开</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    }}
                >
                    <Button type="primary" htmlType="submit" onClick = {this.save}>
                        保存
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

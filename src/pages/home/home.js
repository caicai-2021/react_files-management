import React, { Component } from 'react'
import { Card, Button, Descriptions, Badge, message, Modal, Image } from 'antd';
// 上传照片
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// import { PlusOutlined } from '@ant-design/icons';
// import ImgCrop from 'antd-img-crop';

import './home.less'
// 首页个人页路由组件

import memoryUtils from '../../utils/memoryUtils';

// 引入修改form组件
import EditForm from './editForm'

import { reqEditForm } from '../../api';

import storageUtils from '../../utils/storageUtils';


export default class Home extends Component {
    state = {
        loading: false,
        showStatus: 0,//0：不显示，1：显示修改
    };

    // 点击确定的回调：去添加或修改
    handleOk = async () => {
        // 获取数据，子组件传数据给父组件，重难点
        // this.form就得到了form组件的数据
        console.log(this.form)
        // 发修改信息的请求
        const result = await reqEditForm(this.form)
        this.setState({ showStatus: 0 })
        // 根据请求结果，做不同处理提示
        if (result.state === 0) {
            // 重新获取个人信息
            debugger
            // 删除本地存储
            // memoryUtils.remove()
            const user = result.list
            // memoryUtils.save(user1)
            // 写入本地存储
            storageUtils.saveUser(user)
            memoryUtils.user = user
            // const user = memoryUtils.user
            // this.setState({user:{user}})
            message.success('修改信息成功')
            // this.props.history.replace("/")
        }
        else {
            message.error('修改信息失败')
        }
    }
    // 点击取消的回调：状态隐藏
    handleCancel = () => {
        this.setState({
            showStatus: 0
        })
    }

    render() {
        const user = memoryUtils.user
        // this.setState({user:{user}})
        console.log(user)
        const { showStatus } = this.state
        return (
            <div className='home'>
                <Card title="编辑和保存" extra={
                    <Button
                        type="primary"
                        style={{
                            marginBottom: 3,
                        }}
                        // onclick首先要包括函数的定义
                        onClick={() => { this.setState({ showStatus: 1 }) }}
                    >
                        编辑
                    </Button>} >
                    <Modal
                        title="修改编辑"
                        // title ={showStatus ===1 ? "添加分类" ："修改分类}
                        // 判断=1的时候添加分类，不等于1的时候修改分类，应用于多modal的状态
                        visible={showStatus !== 0}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}>
                        {/* 将子组件传递过来的form对象保存到当前父组件对象，重难点 
                        传递一个接收值的函数，子组件传一个value，父组件得到一个value，将子组件传递来的对象，存到父组件上*/}
                        <EditForm setForm={form => this.form = form} />
                    </Modal>
                    <Descriptions bordered >
                        <Descriptions.Item label="姓名">{user.name}</Descriptions.Item>
                        <Descriptions.Item label="学号">{user.user_number}</Descriptions.Item>
                        <Descriptions.Item label="头像">
                            <Avatar shape="square" size={64} src={<Image src={user.photo_data} />} />
                        </Descriptions.Item>
                        <Descriptions.Item label="性别">{user.gender}</Descriptions.Item>


                        <Descriptions.Item label="邮箱">{user.mail}</Descriptions.Item>
                        <Descriptions.Item label="办公位置">{user.office}</Descriptions.Item>
                        <Descriptions.Item label="电话号码" span={1}>
                            {user.phone}
                        </Descriptions.Item>
                        <Descriptions.Item label="Status" span={1}>
                            <Badge status="processing" text="Running" />
                        </Descriptions.Item>
                        <Descriptions.Item label="居住地">{user.residence}</Descriptions.Item>
                        <Descriptions.Item label="申请时间">{user.create_time}</Descriptions.Item>
                        <Descriptions.Item label="休息室">{user.dorm}</Descriptions.Item>

                    </Descriptions>
                </Card>
            </div>
        )
    }
}

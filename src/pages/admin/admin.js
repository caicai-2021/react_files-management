import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// 使用封装的模块，使用储存调用一样的功能
// import storageUtils from '../../utils/storageUtils';

// 升级直接从内存中读取
import memoryUtils from '../../utils/memoryUtils';

export default class Admin extends Component{
    
    
    render () {
        //读取保存的user，如果不存在，直接跳转到登录界面
        //读取储存的user，如果里面有字符就读取，没有的话就读取空
        //使用是json序列化
        // const user = JSON.parse(localStorage.getItem('user_key') || '{}')
        const user = memoryUtils.user
        if (!user.name){
        // this.props.history.replace('/login')
        //该方法不能再render中直接使用，一般用在事件回调函数中进行路由跳转
        //需要import redirect 一种特殊的组件，可以自己实现路由跳转
            return <Redirect to ='/login'/>
        }
        

        return (
            <div>
            hello,{user.name}
            </div>
        )
    }
}
import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
// 使用封装的模块，使用储存调用一样的功能
// import storageUtils from '../../utils/storageUtils';

// 升级直接从内存中读取
import memoryUtils from '../../utils/memoryUtils';


// 引入左导航布局组件
import LeftNav from '../../components/left-nav';
// 引入头部组件
import Header from '../../components/header';

// 引入布局组件
import { Layout } from 'antd';

import Home from '../home/home';
import Info from '../info/info';
import Intro from '../intro/intro';
import Download from '../download/download';
import FileUpload from '../files/upload';
import Paper from '../files/paper';
import Thesis from '../files/thesis';
import PPT from '../files/ppt';

import PptRe from '../download/pptRe';
import ThesisRe from '../download/thesisRe';
import PaperRe from '../download/paperRe';


const { Footer, Sider, Content } = Layout;


export default class Admin extends Component {

    render() {
        //读取保存的user，如果不存在，直接跳转到登录界面
        //读取储存的user，如果里面有字符就读取，没有的话就读取空
        //使用是json序列化
        // const user = JSON.parse(localStorage.getItem('user_key') || '{}')
        const user = memoryUtils.user
        if (!user.name) {
            // this.props.history.replace('/login')
            //该方法不能再render中直接使用，一般用在事件回调函数中进行路由跳转
            //需要import redirect 一种特殊的组件，可以自己实现路由跳转
            return <Redirect to='/login' />
        }


        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider width={200} >
                    <LeftNav />
                </Sider> 
                <Layout >
                    <Header />
                    <Content style={{ backgroundColor: 'white', margin: '0 20px',marginTop:'20px' }}>
                        <Switch>
                            {/* 大小写都要完全一样 注意要有总的路由图在脑海里 */}
                            <Route path='/home' component={Home} />
                            <Route path='/info' component={Info} />
                            <Route path='/intro' component={Intro} />
                            <Route path='/files/manage/upload' component={FileUpload} />
                            <Route path='/files/manage/paper' component={Paper} />
                            <Route path='/files/manage/thesis' component={Thesis} />
                            <Route path='/files/manage/ppt' component={PPT} />
                            <Route path='/files/download/demo' component={Download} />
                            <Route path='/files/download/paper' component={PaperRe} />
                            <Route path='/files/download/thesis' component={ThesisRe} />
                            <Route path='/files/download/ppt' component={PptRe} />
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center', color: 'black', opacity: 0.5 }}>
                        表面与界面研究室出品 服务科研
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}
import React, { Component } from 'react'
import "./index.less";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

// 包装路由组件，有路由history值!!!
import { withRouter } from 'react-router-dom';

// 动态显示标题
import menuList from '../../cnfig/menuConfig';
// 引用格式化时间方法
import { formateDate } from '../../utils/dateUtils'

// 引入天气请求函数
import { reqWeather } from '../../api'
class Header extends Component {

    // 设计状态，显示日期时间,设计其中属性值
    state = {
        currentTime: formateDate(Date.now()),
        weather: '',
        temp: '',
    }

    // 退出，显示确认退出

    logout = () => {
        Modal.confirm({
            title: '确认退出本系统吗？',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            onOk: () => {
                console.log('OK');
                //  确定后清楚数据
                // local和内存中的
                storageUtils.removeUser()
                memoryUtils.user = {}
                this.props.history.replace('/login')
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    // 根据当前请求的path得到对应的title
    // 两层遍历，在父子菜单项中进行查找，定义find方法，如果存在，返回父标题
    getTitle = () => {
        let title = ''
        const path = this.props.location.pathname
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            }
            else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }

    getWeather = async () => {
        // 发请求
        const { weather, temp } = await reqWeather('110108')
        // 更新状态
        this.setState({
            weather,
            temp
        })
    }

    // 异步操作，可以发送请求，启动定时器等操作
    componentDidMount() {
        // 启动循环定时器
        this.intervalId = setInterval(() => {
            // 将currentTime更新为目前的值
            this.setState({
                currentTime: formateDate(Date.now())
            })
        }, 1000);
        // 发jsonp请求，获取天气信息显示

    }

    componentWillUnmount() {
        // 清除定时器
        clearInterval(this.intervalId)
    }

    render() {
        const user = memoryUtils.user
        // 得到目前的标题
        const title = this.getTitle()
        // 得到目前的时间
        const { currentTime, weather,temp} = this.state
        return (
            <div className="header">
                <div className="header-top">
                    欢迎您！{user.name}&nbsp;&nbsp;
                    <a href="javascript:" onClick={this.logout}>退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}&nbsp;&nbsp;{weather}&nbsp;&nbsp;{temp}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
import React, { Component } from 'react'
import './index.css'

import { Menu } from 'antd';
// import { HomeOutlined, AreaChartOutlined, ProfileOutlined, FileAddOutlined, FileSearchOutlined, TeamOutlined } from '@ant-design/icons';

import logo from '../../assets/images/logo.jpg'
import { Link , withRouter } from 'react-router-dom'
// 引入配置menu文件，批量动态生成menu
import menuList from '../../cnfig/menuConfig';
// 这是左侧导航组件

const { SubMenu } = Menu;
class LeftNav extends Component {
    state = {
        theme: 'dark',
    };

    // 根据指定的menuList数据，生成<menuItem>和<SubMenu>数组
    getMenuNodes = (menuList) => {
        // 请求的路径
        const path = this.props.location.pathname
        return menuList.map(item => {
            if (!item.children) {
                return (
                    // 由于icon转化为脚本的形式，无法使用递归的方法，动态生成,只能被迫取消图标
                    // 后续看看如何改进
                    <Menu.Item key={item.key}>
                        <Link to={item.key} >
                            {item.title}
                        </Link>
                    </Menu.Item>)
            }
            // 解决第二个问题：判断当前item的key是否是我需要的openkey
            // 查找item的所有children中的cItem的key，看是否有一个跟请求的path匹配
            // 定义了一个find方法，来查找children中是否有和路径相同的key,返回变量存在this中
            const cItem =item.children.find(cItem => cItem.key === path)
            if(cItem){
                this.openKey = item.key
            }
            return (<SubMenu key={item.key}  title= {item.title}>
                {this.getMenuNodes(item.children)}
            </SubMenu>)
        })
    }

    // 第一次render（）之前执行一次
    // 为第一次render（）做准备
    componentWillMount(){
        // 优先渲染节点，保证取到this保存值
        this.menuNodes =this.getMenuNodes(menuList)
    }

    render() {
        
        // 定义选中的key为动态
        const selectKey = this.props.location.pathname

        return (
            <div className="left-nav">
                <Link className="left-nav-link" to="/home">
                    <img src={logo} alt="logo" />
                    <h1>智慧科研</h1>
                </Link>
                <>
                {/* default只是根据第一次指定的key显示
                select:总是根据最新指定的key进行显示 */}
                    <Menu
                        theme={this.state.theme}
                        style={{ width: 200 }}
                        defaultOpenKeys={[this.openKey]}
                        selectedKeys={[selectKey]}
                        mode="inline"
                    >
                        {/* 结合递归的方法动态生成menu */}
                        {
                            this.menuNodes
                        }
                        {/* <Menu.Item key="/home" icon = { < HomeOutlined />}>
              <Link to ="/home" >
                  个人主页
              </Link>
          </Menu.Item>
          <SubMenu key="/files" icon={ <ProfileOutlined /> } title="文件管理">
            <Menu.Item key="/files/upload" icon = { <FileAddOutlined />}>
                <Link to ="/files/upload" >
                上传文件
                </Link>
            </Menu.Item>
            <Menu.Item key="files/download" icon = { <FileSearchOutlined />}>
                <Link to ="/files/download" >
                查看文件
                </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/info" icon = { <TeamOutlined />}>
              <Link to ="/info" >
                  信息管理
              </Link>
          </Menu.Item>
          <Menu.Item key="/intro" icon = {<AreaChartOutlined />}>
              <Link to ="/intro" >
                  梯队概况
              </Link>
          </Menu.Item> */}
                    </Menu>
                </>
            </div>
        )
    }
}

// 向外暴露 使用高阶组件withRouter()包装非路由组件
// 新组件向LefNav传递三个特别属性 history/location/match
// 结果：LeftNav可以操作路由相关语法
export default withRouter (LeftNav)
// 2个问题
// 默认选中相应的menuItem
// 有可能需要默认打开某个Submenu，访问的是某个二级菜单项对应的
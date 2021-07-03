# Part 1
## 项目开发准备
1. 描述项目
2. 技术选型
3. API接口/接口文档/测试接口(确保接口文档正确性)

## 启动项目开发
1. 使用react脚手架创建项目
2. 开发环境运行npm/yarn start
3. 生产环境打包运行；`npm run build`,`serve build`

## git命令

## 创建项目的基本结构
* `/src`下面的文件夹进行重写
1. api：ajax请求模块
2. components: 非路由组件
3. pages: 路由组件
4. App.js: 应用的根组件（安装写好之后用Button进行antd测试）
5. index.js: 入口js(提出依赖-wepack提出)

## 引入antd
    下载antd的包
    按需打包：之打包import引入组件的js/css
        下载工具包
        config-overrides.js(** 配置可以拷贝，但是需要了解 **)
        package-json
    自定义主题（未做）
        下载工具包
        config-overrides.js
    使用antd的组件
    	根据antd的文档进行编写（识别相应的语法）--门槛

## 引入路由
* 路由的定义 key和value的映射关系。回调函数或者是值。
		下载包：react-router-dom
        拆分应用路由：
        	Login: 登录
       		Admin：后台登录界面
       	注册路由：（门槛）
       		<BrowserRouter>/<HashRouter>
       		<Switch>
       		<Route Path=''component={}/>
       		
## Login的静态组件
1. 自定义了一部分样式布局
2. 使用antd组件实现登录表单界面（模块寻找出错，找到重新`yarn install`）
	Form / Form.Item
	Input
	Icon
	Button
	
## 相关知识点
1. 区别开发环境运行和生产环境运行的区别
2. 路由的理解
       		
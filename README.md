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

# part2

## 1.收集表单数据和表单的前台验证

    1). form对象
        如何让包含<Form>的组件得到form对象?  WrapLoginForm = Form.create()(LoginForm)
        WrapLoginForm是LoginForm的父组件, 它给LoginForm传入form属性
        用到了高阶函数和高阶组件的技术
    
    2). 操作表单数据
        form.getFieldDecorator('标识名称', {initialValue: 初始值, rules: []})(<Input/>)包装表单项标签
        form.getFieldsValue(): 得到包含所有输入数据的对象
        form.getFieldValue(id): 根据标识得到对应字段输入的数据
    
    3). 前台表单验证
        a. 声明式实时表单验证:
            form.getFieldDecorator('标识名称', {rules: [{min: 4, message: '错误提示信息'}]})(<Input/>)
        b. 自定义表单验证
            form.getFieldDecorator('标识名称', {rules: [{validator: this.validatePwd}]})(<Input/>)
            validatePwd = (rule, value, callback) => {
              if(有问题) callback('错误提示信息') else callack()
            } 
        c. 点击登陆时统一验证
            form.validateFields((error, values) => {
              if(!error) {通过了验证, 发送ajax请求}
            })

 ## 2. *高阶函数与高阶组件*

    1). 高阶函数
        定义: 接收的参数是函数或者返回值是函数
        常见的: 数组遍历相关的方法 / 定时器 / Promise / 高阶组件 / fn.bind(obj)() *(返回值是函数)*
        作用: 实现一个更加强大, 动态的功能
    
    2). 高阶组件: 
        本质是一个函数
        函数接收一个组件, 返回一个新的组件
        Form.create()返回的就是一个高阶组件
    	父子属性   
    
    3). 高阶组件与高阶函数的关系
        高阶组件是特别的高阶函数
        接收一个组件函数, 返回是一个新的组件函数


## 3. 后台应用

    启动后台应用: （MySQL）服务必须启动
    使用postman测试接口(根据接口文档):
        访问测试: post请求的参数在body中设置
        保存测试接口
        导出/导入所有测试接口
    	使用json格式测试，选择body->raw
    	urlencode格式测试，以表单的形式

## 4. 编写ajax代码

    1). *ajax请求函数模块: api/ajax.js*
        封装axios: interceptor + promise
        a. 解决post请求参数后台不能读取问题: axios默认以json形参传递请求体参数, 在请求拦截器中转换成urlencode形式
        b. 请求成功的结果不再是response, 而是reponse.data: 使用响应拦截器成功的回调返回response.data
        c. 内部统一处理请求异常: 在响应拦截失败的回调中返回pending状态的promise, 中断promise链
    
    2). 接口请求函数模块: api/index.js
        根据接口文档编写*(一定要具备这个能力)*
        接口请求函数: 调用ajax模块发请求, 返回值promise对象
    
    3). 解决ajax跨域请求问题(开发时)
        办法: 配置代理  ==> 开发的配置不能用于生产环境
        编码: package.json: proxy: "http://localhost:44394"
    
    4). *对代理的理解*
        a. 是什么?
            具有特定功能的程序: webpack-dev-server ==> http-proxy-middleware
        b. 运行在哪?
            前台应用端, 不在后台应用端
            只能在开发时使用
        c. 作用?
            解决开发时的ajax请求跨域问题
            a. 监视并拦截请求(3000)
            b. 转发请求(4000)
        d. 配置代理
            告诉代理服务器一些信息: 比如转发的目标地址
            开发环境: 前端工程师
            生产环境: 后端工程师
    5). *async和await的理解和使用*
        a. 作用?
           简化promise对象的使用: 不用再使用then()来指定成功/失败的回调函数
           以同步编码(没有回调函数了)方式实现异步流程
        b. 哪里写await?
            在返回promise的表达式左侧写await: 不想要promise, 想要promise异步执行的成功的value数据
        c. 哪里写async?
            await所在函数(最近的)定义的左侧写async

## 5. 实现登陆(包含自动登陆)

    login.jsx
        1). 调用登陆的接口请求
        2). 如果失败, 显示错误提示信息
        3). 如果成功了:
            保存user到local/内存中
            跳转到admin
        4). 如果内存中的user有值, 自动跳转到admin
    admin.jsx
        判断如果内存中没有user(name没有值), 自动跳转到login
    storageUtils.js
        包含使用localStorage来保存user相关操作的工具模块
        使用第三库store
            简化编码
            兼容不同的浏览器
    memoryUtils.js
        用来在内存中保存数据(user)的工具类, user的初始值从local中读取

# part03

## 1. LeftNav组件

    1). 使用antd的组件
        Menu / Menu.Item / Menu.SubMenu
    
    2). 使用react-router
        withRouter(): 包装非路由组件, 给其传入history/location/match属性
        history: push()/replace()/goBack()
        location: pathname属性
        match: params属性
    
    3). componentWillMount与componentDidMount的比较
        共同点：都是请求一次
        区别：调用顺序不同
        componentWillMount: 在第一次render()前调用一次, 为第一次render()准备数据(同步)（menuNodes的准备）
        componentDidMount: 在第一次render()之后调用一次, 启动异步任务, 后面异步更新状态重新render（计时器，发请求）
    
    4). 根据配置数据（menuconfig-数组）动态生成Item和SubMenu的数组
        children\key\title\icon(不行--等待升级)
        map() + 递归: 多级菜单列表
        reduce() + 递归: 多级菜单列表（没写）
        数组常用的方法（push、pop、unshift、map、find、filter)声明事件层
    
    5). 2个问题?
        刷新时如何选中对应的菜单项?
            selectedKey是当前请求的path
        刷新子菜单路径时, 自动打开子菜单列表?
            openKey是 一级列表项的某个子菜单项是当前对应的菜单项

## 2. Header组件

    1). 界面静态布局
        三角形效果
    2). 获取登陆用户的名称显示
        页面有提前检查
        MemoryUtils
    3). 当前时间
        循环定时器, 每隔1s更新当前时间状态
        (格式化指定时间: dateUtils)[https://www.cnblogs.com/mr-wuxiansheng/p/6296646.html]
    4). 天气预报
        (使用jsonp库发jsonp请求腾讯天气预报接口)
        [https://blog.csdn.net/TKOP_/article/details/115962097?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-5.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-5.control]
        对jsonp请求的理解
    5). 当前导航项的标题
        得到当前请求的路由path: withRouter()包装非路由组件
        根据path在menuList中遍历查找对应的item的title
    6). 退出登陆
        Modal组件显示提示
        清除保存的user
        跳转到login
    7). 抽取通用的类链接按钮组件
        通过...透传所有接收的属性: <Button {...props} />    <LinkButton>xxxx</LinkButton>
        组件标签的所有子节点都会成为组件的children属性

## 3. jsonp解决ajax跨域的原理

    1). jsonp只能解决GET类型的ajax请求跨域问题
    2). jsonp请求本质上不是ajax请求, 而是一般的get请求
    3). 基本原理
        network:
        xhr是获取ajax的请求
        js是获取js代码的请求
        浏览器端:
            动态生成<script>来请求后台接口(src就是接口的url)
            定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
        服务器端:
            接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
        浏览器端:
            收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据

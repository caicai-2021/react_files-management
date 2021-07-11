const menuList = [{
    title: '个人主页',
    key: '/home',
    icon: 'HomeOutlined',
},
{
    title: '文件管理',
    key: '/files',
    icon: 'ProfileOutlined',
    children: [
        {
            title: '文件上传',
            key: '/files/upload',
            icon: 'FileAddOutlined',
        },
        {
            title: '文件查看',
            key: '/files/download',
            icon: 'FileSearchOutlined',
        },
    ]
},
{
    title: '信息管理',
    key: '/info',
    icon: 'TeamOutlined',
},
{
    title: '梯队概况',
    key: '/intro',
    icon: 'AreaChartOutlined',
}]
export default menuList
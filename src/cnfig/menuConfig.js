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
            key: '/files/manage',
            icon: 'FileAddOutlined',
            children: [
                {
                    title: 'demo',
                    key: '/files/manage/upload',
                    icon: 'FileAddOutlined',
                },
                {
                    title: '文章',
                    key: '/files/manage/paper',
                    icon: 'FileAddOutlined',
                },
                {
                    title: '论文',
                    key: '/files/manage/thesis',
                    icon: 'FileAddOutlined',
                },
                {
                    title: '展示',
                    key: '/files/manage/ppt',
                    icon: 'FileAddOutlined',
                },
            ]
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
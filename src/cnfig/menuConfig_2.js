const menuList_2 = [{
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
            key: '/wait',
            icon: 'FileAddOutlined',
            children: [
                // {
                //     title: 'demo',
                //     key: '/files/manage/upload',
                //     icon: 'FileAddOutlined',
                // },
                {
                    title: '文章',
                    key: '/wait',
                    icon: 'FileAddOutlined',
                },
                {
                    title: '论文',
                    key: '/wait',
                    icon: 'FileAddOutlined',
                },
                {
                    title: 'ppt',
                    key: '/wait',
                    icon: 'FileAddOutlined',
                },
            ]
        },
        {
            title: '文件查看',
            key: '/wait',
            icon: 'FileSearchOutlined',
            children: [
                // {
                //     title: 'demo查看',
                //     key: '/files/download/demo',
                //     icon: 'FileAddOutlined',
                // },
                {
                    title: '文章查看',
                    key: '/wait',
                    icon: 'FileAddOutlined',
                },
                {
                    title: '论文查看',
                    key: '/wait',
                    icon: 'FileAddOutlined',
                },
                {
                    title: 'ppt查看',
                    key: '/wait',
                    icon: 'FileAddOutlined',
                },
            ]
        },
    ]
},
{
    title: '信息管理',
    key: '/wait',
    icon: 'TeamOutlined',
},
{
    title: '梯队概况',
    key: '/wait',
    icon: 'AreaChartOutlined',
}]
export default menuList_2
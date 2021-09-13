const menuList_1 = [{
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
                    title: 'ppt',
                    key: '/files/manage/ppt',
                    icon: 'FileAddOutlined',
                },
            ]
        },
        {
            title: '文件查看',
            key: '/files/download',
            icon: 'FileSearchOutlined',
            children: [
                {
                    title: '文章查看',
                    key: '/files/download/paper',
                    icon: 'FileAddOutlined',
                },
                {
                    title: '论文查看',
                    key: '/files/download/thesis',
                    icon: 'FileAddOutlined',
                },
                {
                    title: 'ppt查看',
                    key: '/files/download/ppt',
                    icon: 'FileAddOutlined',
                },
            ]
        },
    ]
},
{
    title: '梯队概况',
    key: '/intro',
    icon: 'AreaChartOutlined',
}]
export default menuList_1
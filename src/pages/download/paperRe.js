import React, { Component } from 'react'
import { Table, Input, Button, Card, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { reqPaperList } from '../../api';
import { exportExcel } from 'xlsx-oc';

export default class PaperRe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            // 发请求,得到初始值，设为空数组
            dataSource: [],
            //  是否正在请求加载中
            loading: false,
            searchText: '',
            searchedColumn: '',
            selectedRows: [],
        };
    }
    // 复选框的设置
    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({ selectedRowKeys,selectedRows });
    };

    // 搜索的函数
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    // 重置函数
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };


    // 查找函数
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        查找
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        重置
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        // 高亮显示文本
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    // 初始化table的所有列信息
    initColumns = () => {
        this.columns = [
            {
                title: '序号',
                dataIndex: 'key',
                width: '8%',
                align: 'center',
                editable: true,
                // 可以再次渲染
                // render:text =><a href ="javascript:;">{text}</a>
                fixed: 'left',
                // 筛选的内容
                // defaultSortOrder: 'descend',
                // 升序降序排列
                sorter: (a, b) => a.key - b.key
                // onFilter: (value, record) => record.User_number.indexOf(value) === 0,
                // sorter: (a, b) => a.User_number.length - b.User_number.length,
                // // ...this.getColumnSearchProps('User_number'),
            },
            {
                title: '期刊名',
                dataIndex: 'paper_name',
                align: 'center',
                ...this.getColumnSearchProps('paper_name'),
            },
            {
                title: '期刊号',
                dataIndex: 'paper_number',
                align: 'center',
                ...this.getColumnSearchProps('paper_number'),
            },
            {
                title: '中文名称',
                dataIndex: 'nameCN',
                align: 'center',
                ...this.getColumnSearchProps('nameCN'),
            },
            {
                title: '英文名称',
                dataIndex: 'nameEN',
                align: 'center',
                ...this.getColumnSearchProps('nameEN'),
            },
            {
                title: '第一作者',
                dataIndex: 'first_author',
                align: 'center',
                ...this.getColumnSearchProps('first_author'),
            },
            {
                title: '第一标注基金号',
                dataIndex: 'first_ack',
                align: 'center',
                ...this.getColumnSearchProps('first_ack'),
            },
            {
                title: '所有作者',
                dataIndex: 'authors',
                align: 'center',
                ...this.getColumnSearchProps('authors'),
            },
            {
                title: '第一作者',
                dataIndex: 'Co_author',
                align: 'center',
                ...this.getColumnSearchProps('Co_author'),
            },
            {
                title: '导师',
                dataIndex: 'tutor',
                align: 'center',
                ...this.getColumnSearchProps('tutor'),
            },
            {
                title: '文件提交名称',
                dataIndex: 'file_name',
                align: 'center',
                ...this.getColumnSearchProps('file_name'),
            },
            {
                title: '出版时间',
                dataIndex: 'pub_time',
                align: 'center',
                defaultSortOrder: 'descend',
                // 升序降序排列,由于保存的不是int类型，不能排序
                // sorter: (a, b) => a.gradu_time - b.gradu_time
            },
            {
                title: '文件格式',
                dataIndex: 'file_type',
                align: 'center',
            },
        ];
    }
    // 导出excel函数
    outexcel = () => {
        const { selectedRows } = this.state;
        const data = [];
        for (let i = 0; i < selectedRows.length; i++) {
            const item = selectedRows[i];
            data.push({
                key: i,
                paper_name:item.paper_name,
                paper_number:item.paper_number,
                nameCN:item.nameCN,
                nameEN:item.nameEN,
                first_author:item.first_author,
                first_ack:item.first_ack,
                Co_author:item.first_author,
                authors: item.authors,
                tutor: item.tutor,
                file_name: item.file_name,
                pub_time:item.pub_time,
                file_type: item.file_type,
            });
        }
        const header = [
            {
                k: 'paper_name',
                v: '期刊名字'
            },
            {
                k: 'paper_number',
                v: '期刊号'
            },
            {
                k: 'nameCN',
                v: '中文名称'
            },
            {
                k: 'nameEN',
                v: '英文名称'
            },
            {
                k: 'first_author',
                v: '第一作者'
            },
            {
                k: 'first_ack',
                v: '第一标注基金号'
            },
            {
                k: 'Co_author',
                v: '共同作者'
            },
            {
                k:'authors',
                v:'所有作者'
            },
            {
                k:'tutor',
                v:'导师'
            },
            {
                k:'file_name',
                v:'文件提交名称'
            },
            {
                k:'pub_time',
                v:'发表时间'
            },
            {
                k:'file_type',
                v:'文件格式'
            },
        ];
        const name ='文章提交统计表.xlsx';
        exportExcel(header,data,name);
    }
    // 数据源请求函数
    getdata = async () => {
        // 发请求前，改变loading状态
        this.setState({ loading: true });
        const dataSource = await reqPaperList();
        this.setState({ loading: false });
        console.log(dataSource);
        this.setState({
            dataSource
        })
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getdata()
    }

    render() {
        // 取出状态数据 
        const { dataSource, loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            selections: [
                Table.SELECTION_ALL,
                Table.SELECTION_INVERT,
                Table.SELECTION_NONE,
            ],
        };

        console.log(selectedRowKeys)
        const hasSelected = selectedRowKeys.length > 0;

        return (
            <div className="info">
                <Card title="索引" extra={[
                    <Button className="button-2" type="primary" disabled={!hasSelected} loading={loading} onClick={this.outexcel}>
                        导出
                    </Button>,
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `已选 ${selectedRowKeys.length} 条` : ''}
                    </span>,
                ]}>
                    <div>
                        <Table
                            // 边框
                            bordered
                            dataSource={dataSource}
                            columns={this.columns}
                            // 复选框设置
                            rowSelection={rowSelection}
                            // 数据等待界面
                            loading={loading}
                            // 分页的配置
                            pagination={{ showQuickJumper: true }}
                            // 滚动条
                            scroll={{ x: 1500, y: 380 }}
                        />
                    </div>
                </Card>
            </div>
        )
    }
}

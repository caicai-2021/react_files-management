import React, { Component } from 'react'
// import { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Card, message, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import './info.css'

// 引入数据源请求
import { reqList } from '../../api';
// 引入储存组件备用

import { reqDel } from '../../api';



export default class Info extends Component {
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
            selectedRows:[],
        };
    }
    // 复选框的设置
    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({ selectedRowKeys });
    };

    onDelect = async() =>{
        const { selectedRowKeys } = this.state;
        console.log(selectedRowKeys)
        const result = await reqDel(selectedRowKeys)
        if (result.status === 0){
            message.success('删除成功')
        }
    }

    // 筛选框的渲染
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

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    // 初始化table的所有列信息
    initColumns = () => {
        this.columns = [
            {
                title: '学号',
                dataIndex: 'User_number',
                // width: '15%',
                editable: true,
                // 可以再次渲染
                // render:text =><a href ="javascript:;">{text}</a>
                fixed: 'left',
                filters: [
                    {
                        text: 's',
                        value: 's',
                    },
                    {
                        text: 'g',
                        value: 'g',
                    }],
                defaultSortOrder: 'descend',
                onFilter: (value, record) => record.User_number.indexOf(value) === 0,
                sorter: (a, b) => a.User_number.length - b.User_number.length,
                // ...this.getColumnSearchProps('User_number'),
            },
            {
                title: '类型',
                dataIndex: 'User_type',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.User_type - b.User_type,
            },
            {
                title: '姓名',
                dataIndex: 'Name',
            },
            {
                title: '居住地',
                dataIndex: 'Residence',
                ...this.getColumnSearchProps('Residence'),
            },
            {
                title: '宿舍',
                dataIndex: 'Dorm',
            },
            {
                title: '办公地',
                dataIndex: 'Office',
            },
            {
                title: '邮箱',
                dataIndex: 'Mail',
            },
            {
                title: '电话',
                dataIndex: 'Phone',
            },
            {
                title: '申请时间',
                dataIndex: 'Createtime',
            },
        ];
    }

    // 数据源请求函数
    getdata = async () => {
        // 发请求前，改变loading状态
        this.setState({ loading: true });
        const dataSource = await reqList();
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
                <Card title="梯队成员" extra={[
                    <Button
                        className="button-1"
                        onClick={this.onDelect} type="primary">
                        删除
                    </Button>,
                    <Button
                        className="button-2">
                        保存
                    </Button>,
                    <Button className="button-2" type="primary" disabled={!hasSelected} loading={loading}>
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

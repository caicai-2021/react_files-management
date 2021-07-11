import React, { Component, useRef } from 'react'
import { Descriptions, Badge ,Card ,Button } from 'antd';

import ProDescriptions from '@ant-design/pro-descriptions';

// import  './home.less'
// 首页个人页路由组件

export default class Home extends Component {
  render() {

    return (
      <div className='home'>
       <Card title="编辑和保存" extra={
                    <Button
                        onClick={this.handleAdd}
                        type="primary"
                        style={{
                            marginBottom: 3,
                        }}
                    >
                        编辑
                    </Button>} >
        <Descriptions title="User Info" bordered>
          <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
          <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
          <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
          <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
          <Descriptions.Item label="Usage Time" span={2}>
            2019-04-24 18:00:00
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={3}>
            <Badge status="processing" text="Running" />
          </Descriptions.Item>
          <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
          <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
          <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
          <Descriptions.Item label="Config Info">
            Data disk type: MongoDB
            <br />
            Database version: 3.4
            <br />
            Package: dds.mongo.mid
            <br />
            Storage space: 10 GB
            <br />
            Replication factor: 3
            <br />
            Region: East China 1<br />
          </Descriptions.Item>
        </Descriptions>,
        </Card>
      </div>


    )
  }
}


import React, { Component } from 'react'
import { Result, Button } from 'antd';

export default class Wait extends Component {
    render() {
        return (
            <Result
            title="请向管理员申请权限"
            // extra={
            //   <Button type="primary" key="console">
            //     Go Console
            //   </Button>
            // }
          />
        )
    }
}

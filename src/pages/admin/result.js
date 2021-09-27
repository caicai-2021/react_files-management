import React, { Component } from 'react'

import { Result, Button } from 'antd';

export default class Result_manage extends Component {
    render() {
        return (
            <Result
                status="success"
                title="Successfully Upload!"
                // subTitle="Thank you for using!"
                // extra={[
                //     <Button type="primary" key="console">
                //         Go Console
                //     </Button>,
                //     <Button key="buy">Buy Again</Button>,
                // ]}
            />
        )
    }
}

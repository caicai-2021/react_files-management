import React, { Component } from 'react'
import './index.css'
import memoryUtils from '../../utils/memoryUtils';



export default class Header extends Component {
    
    render() {
        const user = memoryUtils.user
        return (
            <div className = "header">
                欢迎您！{user.name}
            </div>
        )
    }
}

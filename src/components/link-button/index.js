import React from 'react'

import "./index.css"
/*
自定义看似链接实是button的组件
1.{...props}：将接收的所有属性传递给子标签
2.children 标签属性：
    字符串：<linkButton>XXX</linkButton>
    标签对象：<linkButton><span></span></linkButton>
    标签对象的数组：<linkButton><span></span><span></span></linkButton>
*/
export default function LinkButton(props){
    return <button className = "link-button" {...props}/>
}
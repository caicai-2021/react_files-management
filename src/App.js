/*
应用根组件
*/
import React, { Component } from 'react'
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, HashRouter, Switch, Route} from "react-router-dom"

import Login from './pages/login/login.js'
import Admin from './pages/admin/admin.js'//配置前台路由
import Register from './pages/register/register.js'


class App extends Component {
    render () {
        return(
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/admin" component={Admin} />
                <Route path="/register" component = {Register}/>
            </Switch>
        </BrowserRouter>
        )
    }
}
export default App
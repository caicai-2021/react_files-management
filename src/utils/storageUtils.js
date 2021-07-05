/* eslint-disable import/no-anonymous-default-export */
// 操作local数据的工具函数模块

// 可以使用封装好的store包，兼容性能更好
import store from 'store'
// 定义一个常量名称，后续使用的情况下，避免写错
const USER_KEY = 'user_key'
// 分为两种形式
// 一种是默认的整体暴露方法，将其作为方法写入
export default { 
    // 保存user
    saveUser(user){
        // localStorage.setItem(USER_KEY,JSON.stringify(user))
        store.set(USER_KEY,user)
    },
    //读取user 
    // 返回一个user对象，如果没有返回一个{}，方便后续处理
    // 如果而且要是空对象，方便后续处理
    getUser(){
        // return JSON.parse(localStorage.getItem(USER_KEY)||'{}' )
        return store.get(USER_KEY) || {}
    },
    // 删除保存的user
    removeUser(){
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    },

}

// 以函数形式分别暴露
// export function name(params) {
    
// }
import storageUtils from "./storageUtils";

/* eslint-disable import/no-anonymous-default-export */
export default{
    // 用来存储登录用户的信息，默认没有登录
    // 初始值为local中读取的user
    user : storageUtils.getUser(),
}
## 登录

### 请求url
http://localhost:5000/login

### 请求方式：
    Post
### 数据格式
json 尝试一下
### 参数类型
参数
user_number
password

### 返回示例：
    成功：
    {
        "status":0
        "data":{
            "":""
            一系列数据
        }
    }
    失败：
    {
        “status”：1
        "msg":"用户名或密码不正确！“
    }
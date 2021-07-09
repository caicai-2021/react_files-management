// 格式化日期,注意老外的时间从零月开始，我们需要加1
export function formateDate(time) {
    if(!time)return ''
    let date = new Date (time)
    return date.getFullYear() +'-' +(date.getMonth() +1) 
    + '-' +date.getDate() +'  '+date.getHours() +':' +date.getMinutes()
    + ':' +date.getSeconds()
}
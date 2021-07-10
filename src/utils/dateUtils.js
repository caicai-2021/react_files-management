// 格式化日期,注意老外的时间从零月开始，我们需要加1
// export function formateDate(time) {
//     // if(!time)return ''
//     // let date = new Date (time)
//     // return date.getFullYear() +'-' +(date.getMonth() +1) 
//     // + '-' +date.getDate() +'  '+date.getHours() +':' +date.getMinutes()
//     // + ':' +date.getSeconds()
// }

export function formateDate(fmt,time)   
{ //author: meizz   
    if(!time)return ''
    let date = new Date (time)
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    // "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    // "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
} 
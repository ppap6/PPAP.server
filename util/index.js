/*
 * @Author: jwchan1996
 * @Date: 2019-05-21 20:03:18
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-21 17:43:32
 */

//修改标准时间为日期时间字符串
const changeTimeToStr = (time) => {
  let year = time.getFullYear()  
  let month = time.getMonth()+1     
  let day = time.getDate()      
  let hour = time.getHours()      
  let minute = time.getMinutes()     
  let second = time.getSeconds() 
  let newDate = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second     
  return newDate
}

module.exports = {
  changeTimeToStr
}
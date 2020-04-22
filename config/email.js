//邮箱相关
const Email = {
  host: 'smtp.qq.com',
  user: 'ppaplive@qq.com',
  pass: 'trpaqiggpbfgdjei',
  code(){
    return Math.random().toString(16).slice(2, 6).toUpperCase()
  },
  expire() {
    return new Date().getTime() + 300 * 1000
  },
  // smtp_service: '163',
  stmp_service: 'qq',
  smtp_port: 465,
  smtp_secure_connection: true
}

module.exports = Email
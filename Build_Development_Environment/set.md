**---部署快速启动插件**
npm install nodemon -D
然后在package.json文件的scripts修改：
{
"name": "build_development_environment",
"version": "1.0.0",
"description": "",
"main": "bin/www.js",
"scripts": {
**"dev": "nodemon bin/www.js"**
},
"keywords": [],
"author": "",
"license": "ISC",
"devDependencies": {
**"nodemon": "^2.0.15"**
}
}

**---安装数据库插件**
npm install mysql --save
const mysql = require('mysql');

//创建连接对象

const connection = mysql.createConnection({
host:'127.0.0.1',
port:'root',
database:'nodejs',
user:'3306',
password:'123456'
});

//开始连接
connection.connect();

//执行SQL语句
function execSQL(sql,callback) {
connection.query(sql,callback);
}
。。。。

//导出
module.exports={
execSQL
}

**--debug 方法**
"scripts": {
"dev": "nodemon --inspect=9229 bin/www.js"
},

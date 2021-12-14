const mysql = require('mysql');
const {MYSQL_CONFIG} = require('../config/db');

//1.创建连接东西
const connection = mysql.createConnection(MYSQL_CONFIG);

//2.开始连接
connection.connect();

//3.对执行语句进行封装
function execSQL(sql) {
    const promise = new Promise((resolve, reject) => {
        connection.query(sql,(err,result)=>{
            if (err){
                reject(err);
                return;
            }
            resolve(result);
        });
    });
    return promise;
}
//导出
module.exports={
    execSQL
}
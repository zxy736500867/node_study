//项目开始时的启动文件

//创建服务器
const http = require('http');
//引入其他系统包，或者自定义包
const serverHandler = require('../app');

//创建端口
const PORT=8080;


//创建服务
const server = http.createServer(serverHandler);

//创建端口监听
server.listen(PORT,() => {
    console.log('server running at port 8080....');
})
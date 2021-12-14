const querystring = require('querystring');
const {handleStuRoute} = require("./src/routes/stuRoutes");

//设置响应信息
const serverHandle = (req,res) => {

    //1.返回响应格式
    res.setHeader('Content-Type','application/json');

    //2.解析请求路径
    const url = req.url;
    req.path=url.split('?')[0];
    req.query=querystring.parse(url.split('?')[1]);

    debugger;
    //3.对异步数据进行处理
    getMethodData(req).then((requestData)=>{
        req.body=requestData;

        //4.对数据解析，返回
        const stuDataPromise = handleStuRoute(req,res) ;
        if (stuDataPromise){
            debugger
            stuDataPromise.then(stuData=>{
                res.end(JSON.stringify(stuData));
            })
            return;
        }

        debugger
        //5.如果没有命中以上逻辑，就自定义返回提醒
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.write('404 Not Found');
        res.end();
    })
}


//处理各种请求方法的数据
const getMethodData = (req) => {
    const promise = new Promise((resolve, reject) => {

        if (req.method==='GET'){
            resolve({});
            return;
        }

        if (req.headers['content-type']!=='application/json'){
            resolve({});
            return;
        }

        debugger
        //处理post、put、delete的流
        let methodData='';
        req.on('data',(chunk)=>{
            methodData+=chunk.toString();
        });


        req.on('end',()=>{
            if (!methodData){
                resolve({});
                return;
            }
            resolve(JSON.parse(methodData));
        })

    });

    return promise;
}


module.exports=serverHandle;
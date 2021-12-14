const querystring = require('querystring');
const handleBlogRoute = require('./src/routes/blog');

//处理POST数据
const getPostData = (req) => {

    const promise= new Promise((resolve, reject) => {
        //判断不是post请求就返回空字符串
        if (req.method!=='POST'){
            resolve({});
            return;
        }

        if (req.headers['content-type']!=='application/json'){
            resolve({});
            return;
        }

        //处理post的流
        let postData='';
        req.on('data',(chunk)=>{
            postData+=chunk.toString();
        });

        req.on('end',()=>{
            if (!postData){
                resolve({});
                return;
            }
            resolve(
                JSON.parse(postData)
            );
        })

    });

    return promise;
}

//处理Put数据
const getPutData = (req) => {

    const promise= new Promise((resolve, reject) => {
        //判断不是post请求就返回空字符串
        if (req.method!=='PUT'){
            resolve({});
            return;
        }

        if (req.headers['content-type']!=='application/json'){
            resolve({});
            return;
        }

        //处理post的流
        let postData='';
        req.on('data',(chunk)=>{
            postData+=chunk.toString();
        });

        req.on('end',()=>{
            if (!postData){
                resolve({});
                return;
            }
            resolve(
                JSON.parse(postData)
            );
        })

    });

    return promise;
}


//处理delete数据
const getDeleteData = (req) => {

    const promise= new Promise((resolve, reject) => {
        //判断不是post请求就返回空字符串
        if (req.method!=='DELETE'){
            resolve({});
            return;
        }

        if (req.headers['content-type']!=='application/json'){
            resolve({});
            return;
        }

        //处理post的流
        let postData='';
        req.on('data',(chunk)=>{
            postData+=chunk.toString();
        });

        req.on('end',()=>{
            if (!postData){
                resolve({});
                return;
            }
            resolve(
                JSON.parse(postData)
            );
        })

    });

    return promise;
}

const serverHandle = (req,res) => {
    //返回响应格式
    res.setHeader('Content-Type','application/json');

    //获取path
    const url = req.url;
    req.path = url.split('?')[0];

    //解析query
    req.query= querystring.parse(url.split('?')[1]);


    //对post数据进行异步处理
    getPostData(req).then((postData) => {
        req.body=postData;

        //博客相关的路由
        const blogDataPromise = handleBlogRoute(req,res);
        if (blogDataPromise){
            blogDataPromise.then(blogData=>{
                res.end(
                    JSON.stringify(blogData)
                );
            })

            return;
        }

        //如果没有命中以上逻辑，就自定义返回提醒
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.write('404 Not Found');
        res.end();
    });



    //对put数据进行异步处理
    getPutData(req).then((postData) => {
        req.body=postData;

        //博客相关的路由
        const blogDataPromise = handleBlogRoute(req,res);
        if (blogDataPromise){
            blogDataPromise.then(blogData=>{
                res.end(
                    JSON.stringify(blogData)
                );
            })

            return;
        }
        return;

        //如果没有命中以上逻辑，就自定义返回提醒
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.write('404 Not Found');
        res.end();
        return;
    });


    //对delete数据进行异步处理
    getDeleteData(req).then((postData) => {
        req.body=postData;

        //博客相关的路由
        const blogDataPromise = handleBlogRoute(req,res);
        if (blogDataPromise){
            blogDataPromise.then(blogData=>{
                res.end(
                    JSON.stringify(blogData)
                );
            })

            return;
        }

        //如果没有命中以上逻辑，就自定义返回提醒
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.write('404 Not Found');
        res.end();
        return;
    });

}



module.exports=serverHandle;
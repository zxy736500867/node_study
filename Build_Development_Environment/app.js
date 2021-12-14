const serverHandle = (req,res) => {
    //业务代码



    //返回响应头的文本格式 ：定义字符串是json格式的
    res.setHeader('Content-Type','application/json');

    //定义返回响应的数据集
    const responseData={
        name:'zxy',
        age:22
    }

    //返回整个数据,以字符串的形式
    res.end(
        JSON.stringify(responseData)
    )


};

module.exports=serverHandle;
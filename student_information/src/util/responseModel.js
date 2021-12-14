//定义基类
class BaseModel{

    constructor(data,message) {
        if (data){
            this.data=data;
        }
        if (message){
            this.message=message;
        }

        if (typeof data ==='string'){
            this.message=data;
            data=null;
            message=null;
        }
    }
}

//成功的模型类
class SuccessModel extends BaseModel{
    constructor(data,message) {
        super(data,message);
        this.errno=0;
    }
}


//失败的模型类
class ErrorModel extends BaseModel{
    constructor(data,message) {
        super(data,message);
        this.errno=-1;
    }
}

//导出
module.exports={
    SuccessModel,
    ErrorModel
}











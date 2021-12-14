const {getStusList, getStuPrivate, createNewStu, updateStu, deleteStu} = require("../service/stuservice");
const {SuccessModel,ErrorModel} = require("../util/responseModel");

//处理相应的路由请求

const handleStuRoute = (req, res) => {

    //1.请求参数的封装
    const method = req.method;
    const id = req.query.id;
    const stuData = req.body;

    //2.查询所有学生信息
    if (method==='GET'&& req.path==='/api/stu/list'){

        const listDataPromise=getStusList();

        return listDataPromise.then((listData)=>{
            // console.log('listData',listData);
            return new SuccessModel(listData);
        })

    }

    //3.通过id查询学生信息
    if (method==='GET'&& req.path==='/api/stu/private'){
        const privateDataPromise=getStuPrivate(id);

        return privateDataPromise.then(privateData=>{
            return new SuccessModel(privateData);
        })
    }

    //4.新增学生
    if (method==='POST'&& req.path==='/api/stu/new'){



        const newStuDataPromise = createNewStu(stuData);
        return newStuDataPromise.then((newStuData)=>{
            return new SuccessModel(newStuData)
        })
    }

    //5.更新学生信息
    if (method==='PUT'&& req.path==='/api/stu/update'){

        const updateStuDataPromise = updateStu(id,stuData);

        return updateStuDataPromise.then(updateStuData=>{
            if (updateStuData){
                return new SuccessModel('学生信息更新成功');
            }else
                return new ErrorModel('学生信息更新失败');
        })
    }


    //6.删除学生信息
    if (method==='DELETE' && req.path==='/api/stu/delete'){
        const deleteStuDataPromise = deleteStu(id);

        return deleteStuDataPromise.then(deleteStuData=>{
            if (deleteStuData){
                return new SuccessModel('删除成功');
            }else
                return new ErrorModel('删除失败');
        })

    }


}

module.exports={
    handleStuRoute
}
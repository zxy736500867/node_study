const {SuccessModel,ErrorModel} = require('../model/responseModel');
const {getBlogsList,getBlogDetail,createNewBlog ,updateBlog,deleteBlog } = require('../controllers/blogController');


//处理相关路由
const handleBlogRoute = (req,res) => {
  //定义处理路由逻辑
    const method = req.method;

    const id = req.query.id;
    const blogData = req.body;

    //博客列表路由
    if (method==='GET'&& req.path==='/api/blog/list'){


        //GET的参数解析
        const author=req.query.author;
        const keyword=req.query.keyword;
        const listDataPromise = getBlogsList(author,keyword);

       return listDataPromise.then((listData)=>{
            return new SuccessModel(listData);
        });

    }

    //博客详情列表路由
    if (method==='GET'&& req.path==='/api/blog/detail'){

        const detailDataPromise = getBlogDetail(id);
        return detailDataPromise.then(datailData=>{
            return new SuccessModel(datailData);
        })
    }

    //新增博客路由
    if (method==='POST'&& req.path==='/api/blog/new'){


        const newBlogDataPromise = createNewBlog(blogData);
        return newBlogDataPromise.then((newBlogData)=>{
            return new SuccessModel(newBlogData);
        })

    }

    //更新博客路由
    if (method==='PUT'&& req.path==='/api/blog/update'){
      const updatedBlogDataPromsie = updateBlog(id,blogData);
      return updatedBlogDataPromsie.then(updateBlogData=>{
          if (updateBlogData){
              return new SuccessModel('更新博客成功！！');
          }else {
              return new  ErrorModel('更新博客失败！！！');
          }
      })

    }

    //删除博客路由
    if (method==='DELETE'&& req.path==='/api/blog/delete'){
       const deleteBlogDataPromise = deleteBlog(id);

      return deleteBlogDataPromise.then(deleteBlogData=>{

           if (deleteBlogData){
               return new SuccessModel('删除成功');
           }else {
               return new ErrorModel('删除博客失败');
           }
       })
    }
};

//导出
module.exports=handleBlogRoute;
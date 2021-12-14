const {execSQL} = require('../mapper/mysql');
//博客相关的方法

//获取博客列表数据
const getBlogsList = (author,keyword) => {
    //从数据库里面取出数据

    let sql='select * from blogs where 1=1';
    if (author){
         sql+=` and author='${author}' `;
    }
    if (keyword){
        sql+=` and title like '%${keyword}%'`;
    }
    console.log('sql',sql);
    return  execSQL(sql);
}

//获取博客详情数据
const getBlogDetail = (id) => {

    let sql=`select * from blogs where id='${id}'`;
    console.log('sql',sql);
    return  execSQL(sql);
}

//创建新博客
const createNewBlog = (blogData={}) => {
    const title = blogData.title;
    const author = 'zhangxinyu';
    const content = blogData.content;
    const createdAt = Date.now();

    let sql=`insert into blogs (title,content,author,created_at) value ('${title}','${content}','${author}','${createdAt}')`;

    console.log('sql',sql);
    return execSQL(sql);
}

//更新博客
const updateBlog = (id,blogData={}) => {
    const title = blogData.title;
    const content = blogData.content;

    let sql=`update blogs set title='${title}',content='${content}' where id=${id}; `;

    return execSQL(sql);

}

const deleteBlog = (id) => {

    let sql=`delete from blogs where id='${id}';`;

    console.log('sql',sql);
    return execSQL(sql);
}


module.exports={
    getBlogsList,
    getBlogDetail,
    createNewBlog,
    updateBlog,
    deleteBlog
}
const {execSQL} = require("../dao/studao");

//获取学生信息列表数据
const getStusList = () => {

    let sql=`select * from stus ; `;

    return execSQL(sql);
}

//通过id查找学生信息
const getStuPrivate = (id) => {
  let sql=`select * from stus where id='${id}';`;
  return execSQL(sql);
}

//新增学生信息
const createNewStu = (stuData={}) => {

    const name = stuData.name;
    const sex = stuData.sex;
    const age = stuData.age;
    const dept = stuData.dept;
    let sql=`insert into stus (name ,sex,age,dept) value ('${name}','${sex}','${age}','${dept}');`
    console.log('sql',sql)
    return execSQL(sql);
}


//更新学生信息
const updateStu = (id,stuData={}) => {

    const name = stuData.name;
    const sex = stuData.sex;
    const age = stuData.age;
    const dept = stuData.dept;

    let sql=`update stus set name ='${name}',sex='${sex}',age='${age}',dept='${dept}' where id='${id}';  `;

    return execSQL(sql);

}

//删除学生
const deleteStu = (id) => {
  let sql=`delete from stus where id='${id}';`;

  return execSQL(sql);
}



module.exports={
    getStusList,
    getStuPrivate,
    createNewStu,
    updateStu,
    deleteStu
}
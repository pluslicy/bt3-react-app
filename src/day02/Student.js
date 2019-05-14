// 学生管理页面
import React from 'react';
import Clock from './Clock';
import $ from 'jquery';
import './Student.css'

class Student extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stus:[],
      form:{
        username:'terry',
        realname:'泰瑞'
      }
    }
  }
  // 当用户操作表单项改变表单项内容的时候激发,获取表单项内容，改变到state中
  /*
    let obj = {
        username:1,
        realname:2
      }
    {...obj,...{username:3}} 
  */
  changeHandler=(event)=>{
    let tagName = event.target.name;  
    let tagVal = event.target.value;
    console.log(tagName,tagVal);
    this.setState({
      form:{...this.state.form,...{[tagName]:tagVal}}
    })
  }
  componentWillMount(){
    this.loadStudent();
  }

  delStudentHandler(id){
    this.delStudentById(id,({status,message})=>{
      if(status === 200){
        alert(message);
        this.loadStudent();
      } else {
        alert(message);
      }
    })
  }

  // ajax操作，通过id删除学生
  delStudentById(id,handler){
    let url = "http://localhost:7777/student/deleteById?id="+id;
    $.get(url,function(result){
      handler(result);
    })

  }

  // ajax操作，加载学生信息
  loadStudent(){
    // 查询所有学生信息，将学生信息保存到state
    let url = "http://localhost:7777/student/findAll";
    $.get(url,({status,data})=>{
      if(status === 200){
        this.setState({
          stus:data
        })
      } else {
        alert('接口异常');
      }
    });
  }

  render(){
    let name ="学生管理页面";
    let {stus,form} = this.state;
    return (
      <div className='student'>
        <h2>{name}</h2>
        <Clock />
        ---{JSON.stringify(form)}
        <form>
          用户名 <input type='text' name="username" value={form.username} onChange={this.changeHandler}/>
          姓名 <input type='text' name="realname" value={form.realname} onChange={this.changeHandler}/>
        </form>
        <table className='tbl'>
          <thead>
            <tr>
              <th>编号</th>
              <th>用户名</th>
              <th>姓名</th>
              <th>性别</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {
              stus.map((item)=>{
                return (
                  <tr key={item.id}>
                    <td><input type='checkbox'/></td>
                    <td>{item.username}</td>
                    <td>{item.realname}</td>
                    <td>{item.gender}</td>
                    <td>
                      <span onClick={this.delStudentHandler.bind(this,item.id)}>删除</span>
                      <span>修改</span>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Student;
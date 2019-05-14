import React from 'react';
// 参数：用户对象
function UserInfo (props){
  let {user} = props;
  if( user ){
    return (
      <div className="userinfo">
        <div>
          欢迎您，{user.name}
        </div>
      </div>
    )
  }
  return (
    <div className="userinfo">
      <div>
        <a href="#">请登录</a>
        <a href="#">没有账号？请注册</a>
      </div>
    </div>
  )
  
}

export default UserInfo;

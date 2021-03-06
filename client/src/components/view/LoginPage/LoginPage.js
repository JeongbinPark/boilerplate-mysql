import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  
  const onEmailHandler = (e) => {
    setEmail(e.target.value);
  }
  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  }
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const body = {
      email : Email,
      password : Password
    }
    dispatch(loginUser(body))
    .then(res => {
      if(res.payload.loginSuccess){
        navigate('/');
      } else {
        alert(res.payload.message);
      }
    })
  }
  return (
    <div style={{
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    width: '100%', height: '100vh'
    }}>
      <form 
      style={{display: 'flex', flexDirection:'column'}}
      onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button>로그인</button>
      </form>
    </div>
  )
}

export default LoginPage

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [PasswordConfirm, setPasswordConfirm] = useState('');
  const [Name, setName] = useState('');

  const onEmailChangeHandler = (e) =>{
    setEmail(e.target.value);
  }
  const onPasswordChangeHandler = (e) =>{
    setPassword(e.target.value);
  }
  const onPasswordConfirmChangeHandler = (e) =>{
    setPasswordConfirm(e.target.value);
  }
  const onNameChangeHandler = (e) =>{
    setName(e.target.value);
  }
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(Password !== PasswordConfirm) {
      return alert("확인용 비밀번호가 다릅니다.")
    }

    let body = {
      email : Email,
      password : Password,
      name : Name
    }

    dispatch(registerUser(body))
    .then(res=>{
      if(res.payload.success){
        navigate('/');
      } else {
        alert("Error");
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
      onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailChangeHandler} autoComplete="off"/>
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordChangeHandler} autoComplete="off"/>
        <label>Password Confirm</label>
        <input type="password" value={PasswordConfirm} onChange={onPasswordConfirmChangeHandler} autoComplete="off"/>
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameChangeHandler} autoComplete="off"/>
        <button></button>
      </form>
    </div>
  )
}

export default RegisterPage

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { auth } from '../_actions/user_action';

const Auth = (SeparateComponent, option, adminRoute = null) => {
  //option
  //null -> 아무나 출입가능
  //true -> 로그인한 유저만 출입 가능한 페이지 
  //false -> 로그인한 유저는 출입 불가능한 페이지
  //adminRoute == true는 관리자용 페이지

  function AuthenticationCheck(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(auth())
      .then(res=>{
        if(!res.payload.isAuth){  //로그인 전 상태
          if(option) navigate('/login') //로그인한 유저용 페이지
        } else {  //로그인 한 상태
          if(adminRoute && !res.payload.isAdmin){  //관리자용 페이지인데 관리가 아닐 경우
          } else {
            if(!option) navigate('/');  //로그인 안한 유저용 페이지
          }
        }
      })
    }, []);
    
    return(<SeparateComponent />)
  }
  return <AuthenticationCheck />
}

export default Auth;
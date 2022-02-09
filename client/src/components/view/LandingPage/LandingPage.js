import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Axios from 'axios';

function LandingPage() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(true); //false로 변경
  const [UserName, setUserName] = useState('사용자');

  useEffect(() => {
    Axios.get('/api/users/auth')
    .then(res=>{
      if(res.data._id) {
        setIsLoggedIn(true);
        setUserName(res.data.name);
      }
      else setIsLoggedIn(false);
    })
  }, [location]);
  
  const onLogoutHandler = () => {
    Axios.get('/api/users/logout')
    .then(res => {
      if(res.data.success) {
        setIsLoggedIn(false);
      }
      else alert(res.data.err);
    })
    .catch(err => alert("로그아웃에 실패했습니다." ,err));
  }
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <h1>시작페이지</h1> 
     {!isLoggedIn 
     && <div>
          <Link to="/login"><button>로그인</button></Link>
          <Link to="/register"><button>회원가입</button></Link>
        </div>}
     {isLoggedIn 
     && <div>
          <div>반갑습니다, {UserName} 님.</div>
          <button onClick={onLogoutHandler}>로그아웃</button>
        </div>}
    </div>
  )
}

export default LandingPage

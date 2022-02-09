import express from 'express';
const app = express();
const port = 5000;

import bodyParser from 'body-parser';
import cookieParser from'cookie-parser';
import bcrypt from 'bcrypt';
const saltRounds = 10;

import connection from './mysqlConfig';
import auth from './middleware/auth';
import jwt from 'jsonwebtoken';

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//application/x-ww-form-urlencoded 형식 parsing
app.use(bodyParser.urlencoded({extended:true}));
//application/json 형식 parsing
app.use(bodyParser.json());
//cookie에서 사용
app.use(cookieParser());

app.post('/api/users/register', (req,res) => {  //추후에 ID VARCHAR로 변경. promise(async, await)으로 변경.
  //salt 생성
  bcrypt.genSalt(saltRounds, function(err, salt){
    if(err) throw err;
    //hash 생성
    bcrypt.hash(req.body.password, salt, function(err,hash){
      if(err) throw err;
      let data  = {
        email: req.body.email,
        password: hash,
        name: req.body.name,
      };
      const query = connection.query('INSERT INTO userdata SET ?', data, function (error, results, fields) {
        if (error) throw error;
        return res.status(200).json({success: true});
      });
    })
  })
});

app.post('/api/users/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //이메일을 DB에서 찾기
  connection.query('SELECT * FROM userdata WHERE email=?', email, function (error, results, fields) {
    if (error) {console.log(error); throw error; }
    //같은 이메일 없는 경우
    if (!results.length) return res.json({loginSuccess: false, message:"잘못된 이메일입니다."});
    //비밀번호 비교
    let user = results[0];
    bcrypt.compare(password, user.password, function(err, isMatch){
      if(err) throw err; 
      if(!isMatch) return res.json({loginSuccess:false, message:"잘못된 비밀번호입니다."})
      //토큰 생성
      const payload = {_id:user._id.toString()};
      let token = jwt.sign(payload, 'secretToken', { expiresIn: '1h' }) //id와 키 값으로 토큰 생성
      user.token = token;
      //mysql로 user 데이터 저장
      connection.query('UPDATE userdata SET token=? WHERE _id=?',[user.token, user._id], function (error, results, fields) {
        if(error) throw error;
        //쿠키에 토큰 저장
        return res.cookie("x_auth", user.token)
        .status(200)
        .json({loginSuccess:true, userId:user._id})
      })
    });
  });
})

app.get('/api/users/logout', auth, (req, res)=>{
  //db 토큰 삭제
  const _id = req.user._id;
  connection.query('UPDATE userdata SET token=null WHERE _id=?', _id, (error, results, fields)=>{
    if(error) throw error;
    if(!results) res.json({success:false, message:"로그아웃 실패"});
    return res.clearCookie("x_auth").status(200).json({success: true});
  })
})

app.get('/api/users/auth', auth, (req, res)=>{
  //auth에서 통과되고, 받아온 user 정보를 전달.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0? false : true, //role이 0이면 일반사용자
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role
  })
})

app.listen(port, () => console.log(`App is listening on port ${port}`));

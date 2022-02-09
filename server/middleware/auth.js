import connection from '../mysqlConfig';
//토큰을 가져와서 db에서 id를 찾아내고 전달

let auth = (req, res, next) => {
  let token = req.cookies.x_auth;
  
  connection.query('SELECT * from userdata WHERE token = ?', [token], (error, results, fields)=>{
    if(error) throw error;
    //일치하는 _id 없으면 실패
    if(!results.length) return res.json({ isAuth: false, error: true})
    //일치하는 _id 있으면, req에 담고 next
    req.user = results[0];
    req.token = token;
    next();
  })
}

export default auth;
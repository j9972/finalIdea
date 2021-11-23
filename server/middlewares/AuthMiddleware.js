const { verify } = require('jsonwebtoken');
// jwt를 사용하기 위한 변수 선언

const validateToken = (req, res, next) => {
  const accessToken = req.header('accessToken');
  // postman header에 accessToken을 넣어서 로그인 유저를 확인했던것을 위해 req.header의 accessToken을  만듬
  console.log('1999.07.02 accessToken : ', accessToken);
  if (!accessToken) {
    console.log('여기가 문제');
    return res.json({ error: 'User not logged in!' });
    // accessToken이 없을때 유저가 로그인 되지 않음을 error msg로 보여줌
  }

  try {
    const validToken = verify(accessToken, 'importantsecret');
    req.user = validToken;
    if (validToken) {
      throw next();
    } else {
      return res.json({ error: 'err' });
    }
  } catch (err) {
    console.log(err, 'here is the err');
    return res.json({ error: err });
  }
  // try-catch문으로 에러를 찾음, 근데 if ( validation ) 이 있을때만 next 로 넘겨주고 아니면 에러 발생 시켜야 해서 만들었는데 eslint에서 어느 부분때매 경고줄을 띄우늕 모루곘음
  // jwt를 사용한 변수 선언을 하고 이를 req.user에 넣어 로그인시나 회원가입시 accessToken을 부여
};

module.exports = { validateToken };

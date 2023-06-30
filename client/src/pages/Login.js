import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append('email', email);
    bodyFormData.append('password', password);
    await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/signin`,
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((res) => {
            if (res.status === 200) {
              console.log(res.data)
                if(res.data.msg === 'success') {
                  console.log('Signin Successed!');
                  localStorage.setItem('token', res.data.token);
                  localStorage.setItem('email', email);
                  window.location.href = '/'
                }
                if(res.data.msg === 'error')  {
                  console.log('Password is not correct.');
                  setPassword('')
                }
                if(res.data.msg === 'failed')  {
                  console.log('Account is not exist.')
                }
            }
            else {
                console.log('database connection error');
            }
        })
        .catch((err) => {
            console.log(err);
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <button type="button" onClick={()=>{window.location.href='/register'}}>Resiger</button>
      </form>
    </div>
  );
};

export default Login;
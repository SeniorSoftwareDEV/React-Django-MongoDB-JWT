import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('email', email);
    bodyFormData.append('password', password);
    await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/signup`,
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((res) => {
            if (res.status === 200) {
                console.log("ddddddddd", res.data)
                if(res.data === 'success') {
                  console.log('Signin Successed!');
                  window.location.href = '/'
                }
                else {
                  console.log('User already exist.');
                }
                // localStorage.setItem('token', res.data.token);
                // localStorage.setItem('userData', JSON.stringify(res.data.data));
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
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;

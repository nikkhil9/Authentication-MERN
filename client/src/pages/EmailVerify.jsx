import React, { useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AppContest } from '../context/AppContest';

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContest);
  const navigate = useNavigate();
  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join('');

      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp });
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate('/');
  }, [isLoggedin, userData]);

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom right, #bfdbfe, #c4b5fd)' 
    }}>
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        style={{
          position: 'absolute',
          left: '20px',
          top: '20px',
          width: '120px',
          cursor: 'pointer'
        }}
      />
      <form
        style={{
          backgroundColor: '#1e293b',
          padding: '32px',
          borderRadius: '10px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          width: '350px',
          textAlign: 'center'
        }}
        onSubmit={onSubmitHandler}
      >
        <h1 style={{ color: 'white', fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Email Verify OTP</h1>
        <p style={{ color: '#a5b4fc', marginBottom: '24px' }}>Enter the 6-digit code sent to your email id.</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }} onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input
              type="text"
              maxLength="1"
              key={index}
              required
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#333A5C',
                color: 'white',
                textAlign: 'center',
                fontSize: '20px',
                borderRadius: '5px',
                outline: 'none',
                border: '1px solid #4b5563'
              }}
              ref={(e) => (inputRefs.current[index] = e)}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button
          style={{
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(to right, #6366f1, #312e81)',
            color: 'white',
            borderRadius: '50px',
            fontSize: '16px',
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;

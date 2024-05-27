import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RecaptchaAPI = () => {
  const [token, setToken] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // 이 곳에서 토큰을 사용하여 로직을 처리할 수 있습니다.
    console.log("reCAPTCHA 토큰:", token);
  };

  const handleRecaptchaChange = (value) => {
    setToken(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ReCAPTCHA
          sitekey="6LcK--gpAAAAACjHDaPDC1j6X8H4jbap0sYP7HVe"
          onChange={handleRecaptchaChange}
          action="login"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RecaptchaAPI;

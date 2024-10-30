import React, { useRef, useState } from 'react';

export default function Login() {




  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: ''
  });

  const emailIsValid = enteredValues.email.includes('@') && enteredValues.email.includes('.') || enteredValues.email === '';
  
  function handleSubmit(event) {
    event.preventDefault();
    console.log('Form submitted!', enteredValues);
  }

  // function handleEmailChange(event) {
  //   setEnteredEmail(event.target.value);
  // }

  // function handlePasswordChange(event) {
  //   setEnteredPassword(event.target.value);
  // }

  function handleInputChange(identifier, event) {
    setEnteredValues(prev => ({
      ...prev,
      [identifier]: event.target.value
    }))
  };



  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" onChange={(event) => handleInputChange('email',event)} value={enteredValues.email} />
          {!emailIsValid && <div className='control-error'>Email is invalid</div>}
        </div>
        

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" onChange={(event) => handleInputChange('password',event)} value={enteredValues.password} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}

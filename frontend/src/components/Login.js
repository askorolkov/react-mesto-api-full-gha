import React from "react";

function Login(props) {
  const mailRef = React.useRef();
  const passRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();        
    props.onLogin(mailRef.current.value, passRef.current.value)
  }

  return (
    <div className='auth__wrapper'>
      <form className='auth__form' onSubmit={handleSubmit}>
        <h1 className='auth__header'>Войти</h1>
        <label className="auth__field">
          <input className="auth__input" type="text" placeholder="Email" ref={mailRef}/>
        </label>
        <label>
          <input className="auth__input" type="password" placeholder="Пароль" ref={passRef}/>
        </label>          
        <button className="auth__button" type="submit">Войти</button>
      </form>     
    </div>
  );
}

export default Login;
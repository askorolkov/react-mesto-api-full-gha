import React from "react";

function Register(props) {
  const mailRef = React.useRef();
  const passRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();    
    props.onRegister(mailRef.current.value, passRef.current.value)
  }

  return (    
    <div className='auth__wrapper'>
      <form className='auth__form' onSubmit={handleSubmit}>
        <h1 className='auth__header'>Регистрация</h1>
        <label className="auth__field">
          <input className="auth__input" 
                 type="text"
                 placeholder="Email" 
                 ref={mailRef} />
        </label>
        <label>
          <input className="auth__input" 
                type="password" 
                 placeholder="Пароль" 
                 ref={passRef}/>
        </label>          
        <button className="auth__button" type="submit">Зарегистрироваться</button>
      </form>
      
      <p className='auth__text'>Уже зарегистрированы? <a href="/sign-in" className='auth__link'>Войти</a></p>       
      
    </div>
  );
}

export default Register;
import React from 'react';
import logo from '../images/logo.svg';
import { Link, Routes, Route } from 'react-router-dom';

function Header(props) {    
    return(
        <header className="header">
            <img src={logo} alt="логотип проекта место" className="header__logo" />
            <Routes>
                <Route 
                    path="/sign-up" 
                    element={<Link to="/sign-in" className='header__button'>Войти</Link>}>                    
                </Route>
                <Route 
                    path="/sign-in" 
                    element={<Link to="/sign-up" className='header__button'>Регистрация</Link>}>                    
                </Route>
                <Route 
                    path="/" 
                    element={
                    <div className='header__info'>
                        <p className='header__email'>{props.email}</p>
                        <Link to="/sign-in" className='header__button' onClick={props.onClick}>Выход</Link>
                    </div>                     
                    }>                                     
                </Route>      
            </Routes>
                
        </header>
    )    
};

export default Header;

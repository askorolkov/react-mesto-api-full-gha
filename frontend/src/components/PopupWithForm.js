import React from "react";

function PopupWithForm(props) {
  return(
    <div className={props.isOpen ? 
        `popup ${props.name} popup_open` : `popup ${props.name}`}>
      <div className="popup__container">
        <form method="" className='popup__form' name={props.name} onSubmit={props.onSubmit}>
          <h2 className="popup__header">{props.title}</h2>     
          {props.children}   
          <button type="submit" className="popup__save">{props.buttonText}</button>
          <button type="button" className="popup__close" onClick={props.onClose}></button>   
        </form>
      </div>
    </div>
  )
};

export default PopupWithForm;
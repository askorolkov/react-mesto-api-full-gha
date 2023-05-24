import React from "react";
import regfail from '../images/regfail.png';
import regsuccess from '../images/regsuccess.png';

export function InfoToolTip(props) {    
  return (        
      <div className={props.isOpen ? 
        `popup popup_open` : `popup`}>
          <div className='auth__info'>
            <img className='auth__info-image' src={props.registrationState ? regsuccess : regfail} />
            <h2 className='auth__info-text'>
              {props.registrationState ? props.onSuccess : props.onFailure}
            </h2>      
            <button type="submit" className="popup__close" onClick={props.onClose}></button>
          </div>        
      </div>  
  )
}
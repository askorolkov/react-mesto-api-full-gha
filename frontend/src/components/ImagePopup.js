import React from "react";

function ImagePopup(props) {
  
  return (
    <div className={`popup popup_photo ${props.card ? 'popup_open' : ''}`}>
      <div className="fullscreen">
        <img className="fullscreen__image" alt={props.card ? props.card.name : '' } src={props.card ? props.card.link : ''}/>
        <p className="fullscreen__text">{props.card ? props.card.name : '' }</p>
        <button type="button" className="popup__close" onClick={props.onClose}></button>
      </div>
    </div>
  );
};

export default ImagePopup;
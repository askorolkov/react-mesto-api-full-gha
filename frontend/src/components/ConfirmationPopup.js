import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function ConfirmationPopup(props) {

  function handleSubmit(e) {
    e.preventDefault()

    props.onConfirm(props.card_id)
  }

  return (
    <PopupWithForm name='confirmation-popup' 
                  title='Вы уверены?' 
                  isOpen={props.isOpen}
                  onClose={props.onClose}
                  buttonText='Да'
                  onSubmit={handleSubmit}
                  />
  )
}

export default ConfirmationPopup;
import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);  
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(()=>{
    setName(currentUser.userName);
    setDescription(currentUser.userDescription);
  }, [currentUser, props.isOpen]);
  

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name, 
      about: description,
    });
  }

  return (   
    <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} buttonText='Сохранить' onSubmit={handleSubmit}>
    <label className="popup__field">
      <input
          className="popup__input"
          type="text"
          id="formName"
          placeholder="Ваше имя"
          minLength="2"
          maxLength="40"
          required
          value={name}
          onChange={handleNameChange}
          />
          <span className="popup__error formName-error"></span>
    </label>
    <label className="popup__field">
          <input
          className="popup__input"
          type="text"
          id="formJob"
          placeholder="Ваша профессия"
          minLength="2"
          maxLength="200"
          required
          value={description}
          onChange={handleDescriptionChange}
          />
          <span className="popup__error formJob-error"></span>
    </label>
  </PopupWithForm>  
  )
}

export default EditProfilePopup;
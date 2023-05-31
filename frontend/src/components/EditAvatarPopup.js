import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();


  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
    avatarRef.current.value = '';
  }

  function handleClose() {
    props.onClose();
    avatarRef.current.value = '';
  }

  return (
    <PopupWithForm name="change-avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={handleClose} onSubmit={handleSubmit} buttonText='Сохранить'>
        <label className="popup__field">
              <input
              ref={avatarRef}
              className="popup__input"
              type="text"
              id="avatarUrl"
              placeholder="Ссылка"
              minLength="2"
              maxLength="300"
              required
              />
              <span className="popup__error avatarUrl-error"></span>
        </label>
      </PopupWithForm>
  )
}

export default EditAvatarPopup;

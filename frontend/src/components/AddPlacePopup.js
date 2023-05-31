import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {

  const placeNameRef = React.useRef();
  const placeLinkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault()

    props.onAddPlace(placeNameRef.current.value, placeLinkRef.current.value);
    placeNameRef.current.value = '';
    placeLinkRef.current.value = '';
  }

  function handleClose() {
    props.onClose();
    placeNameRef.current.value = '';
    placeLinkRef.current.value = '';
  }

  return (
    <PopupWithForm name="add-place" title="Новое место" isOpen={props.isOpen} onClose={handleClose} onSubmit={handleSubmit} buttonText='Создать'>
        <label className="popup__field">
              <input
              ref={placeNameRef}
              className="popup__input"
              type="text"
              id="placeName"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
              />
              <span className="popup__error placeName-error"></span>
        </label>
        <label className="popup__field">
              <input
              ref={placeLinkRef}
              className="popup__input"
              type="url"
              id="placeLink"
              placeholder="Ссылка на картинку"
              required
              />
              <span className="popup__error placeLink-error"></span>
        </label>
      </PopupWithForm >
  )
}

export default AddPlacePopup;

import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card._id);
  }

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser.userId;
  const isLiked = props.card.likes.some(i => i._id === currentUser.userId);
  const cardLikeButtonClassName = (
    `card__like ${isLiked && 'card__like_active'}`
  );

  return (
    <div className="card" >
      {isOwn && <button aria-label="Удалить" type="button" className="card__delete" onClick={handleDeleteClick}></button>}
      <img className="card__photo" alt={props.card.name} src={props.card.link} onClick={handleCardClick}/>
      <div className="card__description">
        <h2 className="card__location">{props.card.name}</h2>
        <div className="card__counter">
          <button
            aria-label="Поставить лайк"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}>
          </button>
          <p className="card__like_amount">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;

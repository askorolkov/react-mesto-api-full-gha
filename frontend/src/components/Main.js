import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Card from './Card.js';

function Main(props) {
  const user = React.useContext(CurrentUserContext);
  
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img src={user.userAvatar} alt="Аватар профиля" className="profile__avatar-pic" />
          <button onClick={props.onEditAvatar} type="button" className="profile__avatar-edit"></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{user.userName}</h1>
          <button
            onClick={props.onEditProfile}
            aria-label="Редактировать профиль"
            type="button"
            className="profile__edit-button"
          ></button>
          <p className="profile__description">{user.userDescription}</p>
        </div>
        <button
          onClick={props.onAddPhoto}
          aria-label="Добавить место"
          type="button"
          className="profile__add-button"
        ></button>
      </section>
      <section className="photos">
        {props.cardList.map((card,i)=> (    
          <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
          )
        )}
      </section>
    </main>
  );
};

export default Main;
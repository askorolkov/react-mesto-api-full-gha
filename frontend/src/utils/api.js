import { apiOptions } from './constants.js';

class Api {
  constructor(options) {
    this._token = options.token;
    this._group = options.groupId;
  }

  //проверяем ответ сервера и возвращаем результат запроса
  _checkResponse(resp) {
    if (resp.ok) {
      return resp.json();
    }
    return Promise.reject(`Ошибка: ${resp.status}`);
  }

  getUserInfo() {
    return fetch("https://nomoreparties.co/v1/cohort-60/users/me", {
      headers: {
        authorization: "0a98da9d-1ce8-48ff-96dd-ceb4a933f9be",
      },
    }).then((res) => this._checkResponse(res));
  }

  getInitialCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._group}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._checkResponse(res));
  }

  changeAvatar(avatarLink) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._group}/users/me/avatar`,
      {
        method: "PATCH",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: avatarLink.avatar,
        }),
      }
    ).then((res) => this._checkResponse(res));
  }

  changeUserInfo(info) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._group}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: info.name,
        about: info.about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  addNewCard(placeName, placeLink) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._group}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: placeName,
        link: placeLink,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(card_id) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._group}/cards/${card_id}`,
      {
        method: "DELETE",
        headers: {
          authorization: this._token,
        },
      }
    )
    .then((res) => this._checkResponse(res));
  }

  // putLike(card_id) {
  //   console.log('вызвал лайк')
  //   return fetch(
  //     `https://mesto.nomoreparties.co/v1/${this._group}/cards/${card_id}/likes`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         authorization: this._token,
  //       },
  //     }
  //   ).then((res) => this._checkResponse(res));
  // }

  // deleteLike(card_id) {
  //   console.log('вызвал делит')
  //   return fetch(
  //     `https://mesto.nomoreparties.co/v1/${this._group}/cards/${card_id}/likes`,
  //     {
  //       method: "DELETE",
  //       headers: {
  //         authorization: this._token,
  //       },
  //     }
  //   ).then((resp) => this._checkResponse(resp));
  // }

  changeLikeCardStatus(id, likeStatus) {
    if (likeStatus) {      
      return fetch(
        `https://mesto.nomoreparties.co/v1/${this._group}/cards/${id}/likes`,
        {
          method: "DELETE",
          headers: {
            authorization: this._token,
          },
        }
      ).then((resp) => this._checkResponse(resp));
    } else {      
      return fetch(
        `https://mesto.nomoreparties.co/v1/${this._group}/cards/${id}/likes`,
        {
         method: "PUT",
          headers: {
            authorization: this._token,
         },
        }
      ).then((res) => this._checkResponse(res));
      }
  }
}

export const api = new Api(apiOptions);
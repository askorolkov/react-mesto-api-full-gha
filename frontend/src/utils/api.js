import { apiOptions } from './constants.js';

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  //проверяем ответ сервера и возвращаем результат запроса
  _checkResponse(resp) {
    if (resp.ok) {
      return resp.json();
    }
    return Promise.reject(`Ошибка: ${resp.status}`);
  }

  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }).then((res) => this._checkResponse(res));
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }).then((res) => this._checkResponse(res));
  }

  changeAvatar(avatarLink) {
    const token = localStorage.getItem('jwt');
    return fetch(
      `${this.baseUrl}/users/me/avatar`,
      {
        method: "PATCH",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: avatarLink.avatar,
        }),
      }
    ).then((res) => this._checkResponse(res));
  }

  changeUserInfo(info) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: info.name,
        about: info.about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  addNewCard(placeName, placeLink) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: placeName,
        link: placeLink,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(card_id) {
    const token = localStorage.getItem('jwt');
    return fetch(
      `${this.baseUrl}/cards/${card_id}`,
      {
        method: "DELETE",
        headers: {
          authorization: token,
        },
      }
    )
    .then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(id, likeStatus) {
    const token = localStorage.getItem('jwt');
    if (likeStatus) {
      return fetch(
        `${this.baseUrl}/cards/${id}/likes`,
        {
          method: "DELETE",
          headers: {
            authorization: token,
          },
        }
      ).then((resp) => this._checkResponse(resp));
    } else {
      return fetch(
        `${this.baseUrl}/cards/${id}/likes`,
        {
         method: "PUT",
          headers: {
            authorization: token,
         },
        }
      ).then((res) => this._checkResponse(res));
      }
  }
}

export const api = new Api(apiOptions);

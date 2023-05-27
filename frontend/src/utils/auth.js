import { apiOptions } from './constants.js';

export class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(resp) {
    if (resp.ok) {
      return resp.json();
    }
    return Promise.reject(`Ошибка: ${resp.status}`);
  }

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => this._checkResponse(res));
  }

  // вход пользователя
  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    .then((res) => this._checkResponse(res))
  }

  // проверяем токен
  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

}

export const auth = new Auth(apiOptions);

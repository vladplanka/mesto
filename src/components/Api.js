export default class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }
    /** метод проверки на ошибку */
    _checkError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    /** метод загрузки карточек с сервера */
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(res => this._checkError(res));
    }
    /** метод добавления карточек */
    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(res => this._checkError(res));
    }
    /** метод удаления карточек */
    delCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._checkError(res));
    }
    /** метод получения данных профиля */
    getDataProfile() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(res => this._checkError(res));
    }
    /** метод изменения данных профиля */
    setDataProfile(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(res => this._checkError(res));
    }
    /** метод изменения аватарки */
    setAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(res => this._checkError(res));
    }
    /** метод добавления лайка */
    addLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => this._checkError(res));
    }
    /** метод удаления лайка */
    delLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._checkError(res));
    }
}
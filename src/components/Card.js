export default class Card {
    constructor({ data, userId, handleCardClick, handleLikeAdd, handleLikeDel, handleDelCard }, templateSelector) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._userId = userId;
        this._cardId = data._id; // id карточки
        // this._userId = data.userId; // id пользователя
        this._cardOwnerId = data.owner._id; // id создателя карточки
        this._likes = data.likes;

        this._templateSelector = templateSelector;

        /** метод приближения при нажатии на фото */
        this._handleCardClick = handleCardClick;
        /** метод добавления лайка */
        this._handleLikeAdd = handleLikeAdd;
        /** метод удаления лайка */
        this._handleLikeDel = handleLikeDel;
        /** метод нажатия на иконку удаления карточки (popup) */
        this._handleDelCard = handleDelCard;
    }

    /** забирает разметку из HTML и клонирует элемент. Задача метода - вернуть карточки через return */
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.elements__element-card')
            .cloneNode(true);

        return cardElement; // возвращаем DOM-элемент карточки

    }
    /** создание карточки */
    generateCard() {
        this._element = this._getTemplate();

        this._cardPicture = this._element.querySelector('.elements__element-picture');
        this._cardTitle = this._element.querySelector('.elements__element-text');
        this._cardLike = this._element.querySelector('.elements__element-like');
        this._cardTrash = this._element.querySelector('.elements__element-trash');
        this._counterLikes = this._element.querySelector('.elements__element-like-count');

        // this._counterLikes.textContent = this._likes.length;

        this._cardPicture.src = this._link;
        this._cardPicture.alt = `Фотография ${this._name}`;
        this._cardTitle.textContent = this._name;

        this._handleDeleteLike(); // при создании карточки с сервера происходит проверка: совпадает ли id пользователя с id создателя карточки
        this._handleLikeState();
        this._setEventListeners();
        // возвращение элемента наружу
        return this._element;
    }
    /** метод удаления карточки */
    deleteCard() {
        this._element.remove();
        this._element = null; // очистка ссылки на DOM-элемент
    }
    /** метод установки и удаления лайка на странице + счётчик лайков */
    handleLikeCard(data) {
        this._likes = data.likes;
        this._counterLikes.textContent = this._likes.length; // счётчик лайков (берётся длина массива лайков и добавляется в разметку)
        this._cardLike.classList.toggle('elements__element-like_active');
    }

    _handleLikeState() {
        this._likes.forEach((user) => {
            if (user._id === this._userId) {
                this._cardLike.classList.add('elements__element-like_active');
            }
            this._counterLikes.textContent = this._likes.length;
        })
    }
    /** метод удаления лайка только на созданных пользователем карточках */
    _handleDeleteLike() {
        if (this._userId !== this._cardOwnerId) {
            this._cardTrash.remove();
        }
    }

    _setEventListeners() {
        this._cardPicture.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
        this._cardTrash.addEventListener('click', () => {
            this._handleDelCard(this._cardId);
        });
        this._cardLike.addEventListener('click', () => {
            if (this._cardLike.classList.contains('elements__element-like_active')) {
                this._handleLikeDel(this._cardId);
            } else {
                this._handleLikeAdd(this._cardId);
            }
        });
    }
}
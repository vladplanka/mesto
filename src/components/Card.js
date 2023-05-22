export default class Card {
    // constructor({ name, link }, templateSelector, renderPhotoPopup) { можно так. И можно будет вообще убрать data везде
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;

        /** метод приближения при нажатии на фото */
        this._handleCardClick = handleCardClick;
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

        this._cardPicture.src = this._link;
        this._cardPicture.alt = `Фотография ${this._name}`;
        this._cardTitle.textContent = this._name;

        this._setEventListeners();

        return this._element;
    }

    _deleteCard() {
        this._element.remove();
        this._element = null; // очистка ссылки на DOM-элемент
    }

    _likeCard() {
        this._cardLike.classList.toggle('elements__element-like_active');
    }

    _setEventListeners() {
        this._cardPicture.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
        this._cardTrash.addEventListener('click', this._deleteCard.bind(this));
        // button.addEventListener('click', sendButton.click.bind(sendButton)); для понимания. sendButton (1) - из какого объекта берём функцию. sendButton (2) - объект который передаём
        this._cardLike.addEventListener('click', () => {
            this._likeCard();
        });
    }
}
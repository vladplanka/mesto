export default class Card {
    constructor(data, templateSelector, renderPhotoPopup) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;

        this._renderPhotoPopup = renderPhotoPopup; // метод приближения при нажатии на фото
    }

    _getTemplate() { // забираем разметку из HTML и клонируем элемент
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.elements__element-card')
            .cloneNode(true);

        return cardElement; // задача метода _getTemplate — вернуть разметку карточки через return
        // возвращаем DOM-элемент карточки
    }

    generateCard() {
        this._element = this._getTemplate();

        this._cardPicture = this._element.querySelector('.elements__element-picture');
        this._cardTitle = this._element.querySelector('.elements__element-text');
        this._cardLike = this._element.querySelector('.elements__element-like');
        this._cardTrash = this._element.querySelector('.elements__element-trash');

        this._cardPicture.src = this._link;
        this._cardPicture.alt = 'Фотография ' + this._name;
        this._cardTitle.textContent = this._name;

        this._setEventListeners();

        return this._element;
    }

    _deleteCard() {
        this._element.remove();
    }

    _likeCard() {
        this._cardLike.classList.toggle('elements__element-like_active');
    }

    _setEventListeners() {
        this._cardPicture.addEventListener('click', () => {
            this._renderPhotoPopup(this._name, this._link);
        });
        this._cardTrash.addEventListener('click', () => {
            this._deleteCard();
        });
        this._cardLike.addEventListener('click', () => {
            this._likeCard();
        });
    }
}
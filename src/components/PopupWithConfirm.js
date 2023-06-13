import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._form.querySelector('.popup__save');
    }

    submitCallback(sub) {
        this._handleSubmit = sub;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        });
    }
}
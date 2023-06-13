import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);

        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._submitBtn = this._form.querySelector('.popup__save');
        this._submitBtnText = this._submitBtn.textContent;
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(
            (input) => this._formValues[input.name] = input.value);

        return this._formValues;
    };

    setEventListeners() {
        super.setEventListeners();

        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._getInputValues());
        })
    }

    close() {
        super.close();
        this._form.reset();
    }

    loading(save) {
        if (save) {
            this._submitBtn.textContent = 'Сохранение...';
            this._submitBtn.classList.add('popup__save_loading');
        } else {
            this._submitBtn.textContent = this._submitBtnText;
            this._submitBtn.classList.remove('popup__save_loading');
        }
    }
}
export default class Popup {
    constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupBtnClose = this._popup.querySelector('.popup__close');
    }

    /** открытие popup */
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    /** закрытие popup */
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    /** закрытие popup через Esc */
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    //** закрытие popup по нажатию на overlay */
    _handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }

    setEventListeners() {
        this._popupBtnClose.addEventListener('mousedown', this.close.bind(this));
        this._popup.addEventListener('mousedown', this._handleOverlayClose.bind(this));
    }
}
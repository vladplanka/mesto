import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._photoPopupImage = this._popup.querySelector('.popup__photo');
        this._photoPopupTitle = this._popup.querySelector('.popup__photo-title');
    }

    open(name, link) {
        super.open();

        this._photoPopupImage.src = link;
        this._photoPopupImage.alt = `Фотография ${name}`;
        this._photoPopupTitle.textContent = name;
    }
}
export const profilePopup = document.querySelector('.popup_type_profile');
export const profilePopupOpen = document.querySelector('.profile__edit-button');
export const profilePopupForm = document.forms['profile-form'];
export const profilePopupFormInputName = profilePopup.querySelector('.popup__input_type_name');
export const profilePopupFormInputJob = profilePopup.querySelector('.popup__input_type_job');
export const cardsAddPopup = document.querySelector('.popup_type_cards');
export const cardsAddPopupOpen = document.querySelector('.profile__add-button');
export const cardsAddPopupForm = document.forms['card-form'];
export const cardsAddPopupFormInputName = cardsAddPopup.querySelector('.popup__input_type_namecard');
export const cardsAddPopupFormInputLink = cardsAddPopup.querySelector('.popup__input_type_link');

export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
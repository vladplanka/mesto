import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./cards.js";

const profilePopup = document.querySelector('.popup_type_profile');
const profilePopupClose = profilePopup.querySelector('.popup__close_type_profile');
const profilePopupOpen = document.querySelector('.profile__edit-button');
const profilePopupForm = document.forms['profile-form'];
const profilePopupFormInputName = profilePopup.querySelector('.popup__input_type_name');
const profilePopupFormInputJob = profilePopup.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cardsAddPopup = document.querySelector('.popup_type_cards');
const cardsAddPopupClose = cardsAddPopup.querySelector('.popup__close_type_cards');
const cardsAddPopupOpen = document.querySelector('.profile__add-button');
const cardsAddPopupForm = document.forms['card-form'];
const cardsAddPopupFormInputName = cardsAddPopup.querySelector('.popup__input_type_namecard');
const cardsAddPopupFormInputLink = cardsAddPopup.querySelector('.popup__input_type_link');
const cardsAddPopupFormSubmit = cardsAddPopup.querySelector('.popup__save');
const photoPopup = document.querySelector('.popup_type_photo');
const photoPopupImage = photoPopup.querySelector('.popup__photo');
const photoPopupTitle = photoPopup.querySelector('.popup__photo-title');
const photoPopupClose = photoPopup.querySelector('.popup__close_type_photo');
const elements = document.querySelector('.elements');
const elementsTemplate = document.querySelector('.elements-template').content;
const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

/** универсальная функция открытия попапов */
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleClosePopupEsc);
}

/** универсальная функция закрытия попапов */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleClosePopupEsc);
}

/** закрытие всех модальных окон */
closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    popups.forEach(closePopup);
  })
})

/** функция отправки формы в попапе редактирования профиля */
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupFormInputName.value;
  profileDescription.textContent = profilePopupFormInputJob.value;
  closePopup(profilePopup);
};

/** функция к попапу приближения фото */
function renderPhotoPopup(name, link) {
  photoPopupImage.src = link;
  photoPopupImage.alt = 'Фотография ' + name;
  photoPopupTitle.textContent = name;
  openPopup(photoPopup);
}

/** функция создания карточки */
const createCard = ({ name, link }) => {
  const cardNew = new Card({ name, link }, '.elements-template', renderPhotoPopup);
  const cardElement = cardNew.generateCard();

  return cardElement;
}

/** создание карточек из массива */
initialCards.forEach((name, link) => {
  elements.append(createCard(name, link));
});


/** функция создания карточек вручную */
function renderCard(item) {
  elements.prepend(item);
}

/** функция отправки формы в попапе добавления карточки */
function handleFormSubmitCards(evt) {
  evt.preventDefault();
  const newCard = createCard({
    name: cardsAddPopupFormInputName.value,
    link: cardsAddPopupFormInputLink.value
  });
  renderCard(newCard);
  closePopup(cardsAddPopup);
  cardsAddPopupForm.reset();
  validationAddPopup.toggleButtonState();
}

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const validationProfilePopup = new FormValidator(validationSettings, profilePopupForm);
const validationAddPopup = new FormValidator(validationSettings, cardsAddPopupForm);

validationProfilePopup.enableValidation();
validationAddPopup.enableValidation();

/** закрытие через Esc */
const handleClosePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    popups.forEach(closePopup);
  }
}

/** закрытие popup через клик по overlay */
const closePopupsOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

popups.forEach(popup => {
  popup.addEventListener('mousedown', closePopupsOverlay);
});

profilePopupOpen.addEventListener('click', () => {
  profilePopupFormInputName.value = profileName.textContent;
  profilePopupFormInputJob.value = profileDescription.textContent;
  openPopup(profilePopup);
});

cardsAddPopupOpen.addEventListener('click', () => {
  openPopup(cardsAddPopup);
});

profilePopupForm.addEventListener('submit', handleFormSubmitProfile);

cardsAddPopupForm.addEventListener('submit', handleFormSubmitCards);


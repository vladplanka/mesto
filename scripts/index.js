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



function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

// закрытие всех модальных окон
closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    popups.forEach(closePopup);
  })
})

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupFormInputName.value;
  profileDescription.textContent = profilePopupFormInputJob.value;
  closePopup(profilePopup);
};

// функция к попапу приближения фото
function renderPhotoPopup(name, link) {
  photoPopupImage.src = link;
  photoPopupImage.alt = 'Фотография ' + name;
  photoPopupTitle.textContent = name;
  openPopup(photoPopup);
}

const createCard = ({ name, link }) => {
  const cardNew = new Card({ name, link }, '.elements-template', renderPhotoPopup);
  const cardElement = cardNew.generateCard();

  return cardElement;
}

initialCards.forEach((item) => {
  const card = new Card(item, '.elements-template', renderPhotoPopup);
  const cardElement = card.generateCard();

  elements.append(cardElement);
});


// Создание карточек вручную
function renderCard(item) {
  elements.prepend(item);
}

function handleFormSubmitCards(evt) {
  evt.preventDefault();
  const newCard = createCard({
    name: cardsAddPopupFormInputName.value,
    link: cardsAddPopupFormInputLink.value
  });
  renderCard(newCard);
  closePopup(cardsAddPopup);
  cardsAddPopupForm.reset();
  cardsAddPopupFormSubmit.setAttribute('disabled', true);
  cardsAddPopupFormSubmit.classList.add('popup__save_inactive');
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

// enableValidation(settings);

// закрытие через Esc
const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    popups.forEach(closePopup);
  }
}

// закрытие popup через клик по overlay
const closePopupsOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}




popups.forEach(popup => {
  popup.addEventListener('mousedown', closePopupsOverlay);
});

profilePopupOpen.addEventListener('click', () => {
  openPopup(profilePopup);
  profilePopupFormInputName.value = profileName.textContent;
  profilePopupFormInputJob.value = profileDescription.textContent;
});

cardsAddPopupOpen.addEventListener('click', () => {
  openPopup(cardsAddPopup);
});

profilePopupForm.addEventListener('submit', handleFormSubmitProfile);

cardsAddPopupForm.addEventListener('submit', handleFormSubmitCards);
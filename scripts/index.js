import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./cards.js";
import PopupWithImage from "./Popup.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";

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

const popupImage = new PopupWithImage('.popup_type_photo');
popupImage.setEventListeners();

const handleCardClick = (name, link) => {
  popupImage.open(name, link);
}

/** функция отправки формы в попапе редактирования профиля */
 function handleFormSubmitProfile() {
  profileInfo.setUserInfo({
    name: profilePopupFormInputName.value,
    description: profilePopupFormInputJob.value
  })
  popupProfile.close();
 };

const profileInfo = new UserInfo({
  profileName: '.profile__name',
  profileDescription: '.profile__description'
});

/** функция создания карточки */
const createCard = ({ name, link }) => {
  const cardNew = new Card({ name, link }, '.elements-template', handleCardClick);
  const cardElement = cardNew.generateCard();

  return cardElement;
}

const cardsSection = new Section({
  items: initialCards.reverse(),
  renderer: (name, link) => {
    cardsSection.addItem(createCard(name, link));
  }
}, '.elements');

cardsSection.renderItems();

const popupProfile = new PopupWithForm('.popup_type_profile', handleFormSubmitProfile);
popupProfile.setEventListeners();

const popupAddCards = new PopupWithForm('.popup_type_cards', handleFormSubmitCards);
popupAddCards.setEventListeners();

/** функция отправки формы в попапе добавления карточки */
function handleFormSubmitCards() {
  const newCard = createCard({
    name: cardsAddPopupFormInputName.value,
    link: cardsAddPopupFormInputLink.value
  });
  cardsSection.addItem(newCard);
  popupAddCards.close();
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

profilePopupOpen.addEventListener('click', () => {
  const userInfo = profileInfo.getUserInfo();
  profilePopupFormInputName.value = userInfo.name;
  profilePopupFormInputJob.value = userInfo.description;
  popupProfile.open();
});

cardsAddPopupOpen.addEventListener('click', () => {
  popupAddCards.open();
});


import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "../components/cards.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  profilePopupOpen,
  profilePopupForm,
  profilePopupFormInputName,
  profilePopupFormInputJob,
  cardsAddPopupOpen,
  cardsAddPopupForm,
  cardsAddPopupFormInputName,
  cardsAddPopupFormInputLink,
  validationSettings
} from "../utils/constants.js";

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


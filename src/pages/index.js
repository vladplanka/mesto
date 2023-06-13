import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  profilePopupOpen,
  profilePopupForm,
  profilePopupFormInputName,
  profilePopupFormInputJob,
  cardsAddPopupOpen,
  cardsAddPopupForm,
  buttonAvatar,
  formAvatar,
  validationSettings,
} from "../utils/constants.js";

import Api from "../components/Api.js";

// API

let userId;

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'b07e3a51-1fb6-4809-9d17-9716d132760b',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getDataProfile(), api.getInitialCards()])
  .then(([profInfo, cardsData]) => {
    userId = profInfo._id;
    profileInfo.setUserInfo(profInfo);
    cardsSection.renderItems(cardsData);
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  })

const popupImage = new PopupWithImage('.popup_type_photo');
popupImage.setEventListeners();

/** функция отправки формы в попапе редактирования профиля */
function handleFormSubmitProfile(item) {
  popupProfile.loading(true)
  api.setDataProfile(item)
    .then((res) => {
      profileInfo.setUserInfo(res);
      popupProfile.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupProfile.loading(false);
    })
};

const profileInfo = new UserInfo({
  profileName: '.profile__name',
  profileDescription: '.profile__description',
  profileAvatar: '.profile__avatar'
});

/** функция создания карточки */
const createCard = (item) => {
  const cardNew = new Card({
    data: item,
    userId: userId,
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
    },
    handleDelCard: (cardId) => {
      popupWithConfirm.open();
      popupWithConfirm.submitCallback(() => {
        api.delCard(cardId)
          .then(() => {
            popupWithConfirm.close();
            cardNew.deleteCard();
          })
          .catch((error) => {
            console.log(`Ошибка: ${error}`);
          })
      })
    },
    handleLikeAdd: (cardId) => {
      api.addLike(cardId)
        .then((data) => {
          cardNew.handleLikeCard(data);
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        })
    },
    handleLikeDel: (cardId) => {
      api.delLike(cardId)
        .then((data) => {
          cardNew.handleLikeCard(data)
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        });
    },
  },
    '.elements-template');

  const cardElement = cardNew.generateCard();
  return cardElement;
};

const popupWithConfirm = new PopupWithConfirm('.popup_type_confirm');
popupWithConfirm.setEventListeners();

const cardsSection = new Section({
  renderer: (item) => {
    const cardArray = createCard(item);
    cardsSection.addItem(cardArray, 'append');
  }
}, '.elements');


/** функция отправки формы в попапе добавления карточки */
function handleFormSubmitCards(data) {
  popupAddCards.loading(true);
  api.addNewCard(data)
    .then((res) => {
      cardsSection.addItem(createCard(res), 'prepend');
      popupAddCards.close();
    })
    .catch((error) => console.log(error))
    .finally(() => {
      popupAddCards.loading(false);
    })
};

function handleFormSubmitAvatar(data) {
  popupAvatar.loading(true);
  api.setAvatar(data)
    .then((res) => {
      profileInfo.setUserInfo(res);
      popupAvatar.close();
    })
    .catch((error) => console.log(error))
    .finally(() => {
      popupAvatar.loading(false);
    })
};


const popupProfile = new PopupWithForm('.popup_type_profile', handleFormSubmitProfile);
popupProfile.setEventListeners();

const popupAddCards = new PopupWithForm('.popup_type_cards', handleFormSubmitCards);
popupAddCards.setEventListeners();

const popupAvatar = new PopupWithForm('.popup_type_avatar', handleFormSubmitAvatar);
popupAvatar.setEventListeners();

const validationProfilePopup = new FormValidator(validationSettings, profilePopupForm);
const validationAddPopup = new FormValidator(validationSettings, cardsAddPopupForm);
const validationAvatarPopup = new FormValidator(validationSettings, formAvatar);

// Валидация

validationProfilePopup.enableValidation();
validationAddPopup.enableValidation();
validationAvatarPopup.enableValidation();

buttonAvatar.addEventListener('click', () => {
  popupAvatar.open();
  validationAvatarPopup.toggleButtonState();
})

// кнопка открытия попапа редактирования профиля
profilePopupOpen.addEventListener('click', () => {
  const userInfo = profileInfo.getUserInfo();
  profilePopupFormInputName.value = userInfo.name;
  profilePopupFormInputJob.value = userInfo.description;
  popupProfile.open();
});

cardsAddPopupOpen.addEventListener('click', () => {
  popupAddCards.open();
  validationAddPopup.toggleButtonState();
});


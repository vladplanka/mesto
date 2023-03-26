const profilePopup = document.querySelector('.popup_type_profile');
const profilePopupClose = profilePopup.querySelector('.popup__close_type_profile');
const profilePopupOpen = document.querySelector('.profile__edit-button');
const profilePopupForm = document.querySelector('.popup__form_type_profile');
const profilePopupFormInputName = profilePopup.querySelector('.popup__input_type_name');
const profilePopupFormInputJob = profilePopup.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cardsAddPopup = document.querySelector('.popup_type_cards');
const cardsAddPopupClose = cardsAddPopup.querySelector('.popup__close_type_cards');
const cardsAddPopupOpen = document.querySelector('.profile__add-button');
const cardsAddPopupForm = document.querySelector('.popup__form_type_cards');
const cardsAddPopupFormInputName = cardsAddPopup.querySelector('.popup__input_type_namecard');
const cardsAddPopupFormInputLink = cardsAddPopup.querySelector('.popup__input_type_link');
const photoPopup = document.querySelector('.popup_type_photo');
const photoPopupImage = photoPopup.querySelector('.popup__photo');
const photoPopupTitle = photoPopup.querySelector('.popup__photo-title');
const photoPopupClose = photoPopup.querySelector('.popup__close_type_photo');
const elements = document.querySelector('.elements');
const elementsTemplate = document.querySelector('.elements-template').content;




function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function handleFormSubmitProfile (evt) {
    evt.preventDefault();
    profileName.textContent = profilePopupFormInputName.value;
    profileDescription.textContent = profilePopupFormInputJob.value;
    closePopup(profilePopup);
};

// Функция создания карточки
  function createCard ({name, link}) {
    const card = elementsTemplate.querySelector('.elements__element-card').cloneNode(true);
      card.querySelector('.elements__element-text').textContent = name;
      card.querySelector('.elements__element-picture').src = link;
      card.querySelector('.elements__element-picture').alt = 'Фотография ' + name;

// Активый like
    card.querySelector('.elements__element-like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('elements__element-like_active');
  });

// Удаление карточки
    card.querySelector('.elements__element-trash').addEventListener('click', function () {
      card.remove();
  });
// Попап приближения фото
    card.querySelector('.elements__element-picture').addEventListener('click', () => {
      renderPhotoPopup(name, link);
    });

    return card;

  };

// функция к попапу приближения фото
function renderPhotoPopup (name, link) {
      photoPopupImage.src = link;
      photoPopupImage.alt = 'Фотография ' + name;
      photoPopupTitle.textContent = name;
      openPopup(photoPopup);
}
// Создание карточек из массива
  initialCards.forEach(function (name, link) {
    elements.append(createCard(name, link));
  });


// Создание карточек вручную
function renderCard(item) {;
    elements.prepend(item);
}

function handleFormSubmitCards (evt) {
    evt.preventDefault();
    const newCard = createCard({
      name: cardsAddPopupFormInputName.value,
      link: cardsAddPopupFormInputLink.value
    });
    renderCard(newCard);
    closePopup(cardsAddPopup);
    cardsAddPopupForm.reset();
  }




profilePopupOpen.addEventListener('click', () => {
  openPopup(profilePopup);
  profilePopupFormInputName.value = profileName.textContent;
  profilePopupFormInputJob.value = profileDescription.textContent;
});

profilePopupClose.addEventListener('click', () => {
  closePopup(profilePopup);
});

cardsAddPopupClose.addEventListener('click', () => {
  closePopup(cardsAddPopup);
});

cardsAddPopupOpen.addEventListener('click', () => {
  openPopup(cardsAddPopup);
});

photoPopupClose.addEventListener('click', () => {
  closePopup(photoPopup);
});

profilePopupForm.addEventListener('submit', handleFormSubmitProfile);

cardsAddPopupForm.addEventListener('submit', handleFormSubmitCards);
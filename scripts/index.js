const popupElement = document.querySelector('.popup');
const popupButtonClose = popupElement.querySelector('.popup__close');
const popupButtonOpen = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__form');
const nameInput = popupElement.querySelector('.popup__input_type_name');
const jobInput = popupElement.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupAddElement = document.querySelector('.popup-add');
const popupAddButtonClose = popupAddElement.querySelector('.popup-add__close');
const popupAddButtonOpen = document.querySelector('.profile__add-button');
const elements = document.querySelector('.elements');
const elementsTemplate = document.querySelector('.elements-template').content;
const formAddElement = document.querySelector('.popup-add__form');
const nameAddInput = popupAddElement.querySelector('.popup-add__input_type_name');
const linkAddInput = popupAddElement.querySelector('.popup-add__input_type_link');
const popupOpenImage = document.querySelector('.popup-photo');
const popupOpenPhoto = popupOpenImage.querySelector('.popup-photo__image');
const popupOpenImageTitle = popupOpenImage.querySelector('.popup-photo__title');
const popupButtonClosePhoto = popupOpenImage.querySelector('.popup-photo__close');


function openPopup () {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
};

function closePopup () {
    popupElement.classList.remove('popup_opened');
};

function openPopupAdd () {
    popupAddElement.classList.add('popup-add_opened');
}

function closePopupAdd () {
    popupAddElement.classList.remove('popup-add_opened');
};

function openPopupPhoto () {
    popupOpenImage.classList.add('popup-photo_opened');
}

function closePopupPhoto () {
    popupOpenImage.classList.remove('popup-photo_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup();
};

popupButtonOpen.addEventListener('click', openPopup);
popupButtonClose.addEventListener('click', closePopup);
popupAddButtonClose.addEventListener('click', closePopupAdd);
popupAddButtonOpen.addEventListener('click', openPopupAdd);
formElement.addEventListener('submit', handleFormSubmit);
popupButtonClosePhoto.addEventListener('click', closePopupPhoto);


const initialCards = [
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
      renderPopupImage(name, link);
    });

    return card;

  };
// функция к попапу приближения фото
function renderPopupImage (name, link) {
      popupOpenPhoto.src = link;
      popupOpenPhoto.alt = 'Фотография ' + name;
      popupOpenImageTitle.textContent = name;
      openPopupPhoto();
}
// Создание карточек из массива
  initialCards.forEach(function (name, link) {
    elements.append(createCard(name, link));
  });


// Создание карточек вручную
function renderCard(item) {;
    elements.prepend(item);
}

function handleFormSubmitAdd (evt) {
    evt.preventDefault();
    const newCard = createCard({
      name: nameAddInput.value,
      link: linkAddInput.value
    });
    renderCard(newCard);
    closePopupAdd();
    nameAddInput.value = '';
    linkAddInput.value = '';
  }

formAddElement.addEventListener('submit', handleFormSubmitAdd);



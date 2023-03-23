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
const elementsProb = document.querySelector('.elements');
const elementsTemplate = document.querySelector('.elements-template').content;
const formAddElement = document.querySelector('.popup-add__form');
const nameAddInput = popupAddElement.querySelector('.popup-add__input_type_name');
const linkAddInput = popupAddElement.querySelector('.popup-add__input_type_link');

function popupOpen() {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
};

const popupClose = function () {
    popupElement.classList.remove('popup_opened');
};

const popupAddOpen = function () {
    popupAddElement.classList.add('popup-add_opened');
}

const popupAddClose = function () {
    popupAddElement.classList.remove('popup-add_opened');
};

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupClose();
};

function handleFormSubmitAdd (evt) {
    const cardTemplate = elementsTemplate.querySelector('.elements__element-card').cloneNode(true);
    evt.preventDefault();
    cardTemplate.querySelector('.elements__element-text').textContent = nameAddInput.value;
    cardTemplate.querySelector('.elements__element-picture').src = linkAddInput.value;
    cardTemplate.querySelector('.elements__element-like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__element-like_active');
    });
    elementsProb.prepend(cardTemplate);
    popupAddClose();
    nameAddInput.value = '';
    linkAddInput.value = '';
}

popupButtonOpen.addEventListener('click', popupOpen);
popupButtonClose.addEventListener('click', popupClose);
popupAddButtonClose.addEventListener('click', popupAddClose);
popupAddButtonOpen.addEventListener('click', popupAddOpen);
formElement.addEventListener('submit', handleFormSubmit);
formAddElement.addEventListener('submit', handleFormSubmitAdd);


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

  initialCards.forEach(function (element) {
    const ElementCard = elementsTemplate.cloneNode(true);

    ElementCard.querySelector('.elements__element-text').textContent = element.name;
    ElementCard.querySelector('.elements__element-picture').src = element.link;
    ElementCard.querySelector('.elements__element-like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__element-like_active');
    })
    ElementCard.querySelector('.elements__element-trash').addEventListener('click', function () {
      ElementCard.remove();
    });

    elementsProb.append(ElementCard);
  });
const popupElement = document.querySelector(".popup");
const popupButtonClose = popupElement.querySelector(".popup__close");
const popupButtonOpen = document.querySelector(".profile__edit-button");
const formElement = document.querySelector(".popup__form");
const nameInput = popupElement.querySelector(".popup__input_type_name");
const jobInput = popupElement.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const LikeButton = document.querySelectorAll(".elements__element-like");

for (let i = 0; i < LikeButton.length; i++) {
    LikeButton[i].addEventListener("click", function () {
        LikeButton[i].classList.toggle("elements__element-like_active");
    });
}

function popupOpen() {
    popupElement.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
};

const popupClose = function () {
    popupElement.classList.remove("popup_opened");
};

popupButtonOpen.addEventListener("click", popupOpen);
popupButtonClose.addEventListener("click", popupClose);

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupClose();
};
formElement.addEventListener("submit", handleFormSubmit);
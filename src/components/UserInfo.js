export default class UserInfo {
    constructor({ profileName, profileDescription }) {
        this._profileName = document.querySelector(profileName);
        this._profileDescription = document.querySelector(profileDescription);
    }

    getUserInfo() {
        this._userInfo = {
            name: this._profileName.textContent,
            description: this._profileDescription.textContent
        }
        return this._userInfo;
    }

    setUserInfo(userInfo) {
        this._profileName.textContent = userInfo.name;
        this._profileDescription.textContent = userInfo.description;
    }
}
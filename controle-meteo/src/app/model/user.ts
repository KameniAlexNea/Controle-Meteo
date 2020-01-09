export class User {

    constructor(
        public _email : string,
        public _password : string,
        public _name : string,
        public _surname : string,
        public _picture : string,
        public _sex : string,
        public _birthday : string
    ){}
    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get name() {
        return this._name;
    }

    get surname() {
        return this._surname;
    }

    get picture() {
        return this._picture;
    }

    get sex() {
        return this._sex;
    }

    get birthday() {
        return this._birthday;
    }

    set email(email : string) {
        this._email = email;
    }

    set password(password : string) {
        this._password = password;
    }

    set name(name : string) {
        this._name = name;
    }

    set surname(surname : string) {
        this._surname = surname;
    }

    set picture(picture : string) {
        this._picture = picture;
    }

    set sex(sex : string) {
        this._sex = sex;
    }

    set birthday(birthday : string) {
        this._birthday = birthday;
    }
}

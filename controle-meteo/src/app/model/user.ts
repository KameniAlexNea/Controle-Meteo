export class User {
    private _email : string;
    private _password : string;
    private _name : string; 
    private _surname : string;
    private _picture : string;
    private _sex : string;
    private _birthday : string;

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

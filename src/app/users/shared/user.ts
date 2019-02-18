/**
 * User that gets stored in localStorage
 */
export class User {
    _id: string;
    name: string;
    avatar: string;
    location: string;
    userId: string;

    constructor(_id: string,
        name: string,
        avatar: string,
        location: string,
        userId: string) {
        this._id = _id;
        this.name = name;
        this.avatar = avatar;
        this.location = location;
        this.userId = userId;
    }

}

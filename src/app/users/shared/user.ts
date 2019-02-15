/**
 * User that gets stored in localStorage
 */
export class User {
    id: string;
    name: string;
    avatar: string;
    location: string;
    userId: string;

    constructor(id: string,
        name: string,
        avatar: string,
        location: string,
        userId: string) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.location = location;
        this.userId = userId;
    }

}

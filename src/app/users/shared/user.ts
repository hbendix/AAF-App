/**
 * User that gets stored in localStorage
 */
export class User {
    id: string;
    name: string;
    avatar: string;
    location: string;

    constructor(id: string,
        name: string,
        avatar: string,
        location: string) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.location = location;
    }

}

export class UserDetails {
    userId: number;
    name: string;
    when: number;
    avatar: string;

    constructor(userId: number,
        name: string,
        when: number,
        avatar: string) {
            this.userId = userId;
            this.name = name;
            this.when = when;
            this.avatar = avatar;
    }
}

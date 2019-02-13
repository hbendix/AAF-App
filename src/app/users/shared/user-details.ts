/**
 * User class, used to update files with latest actions
 */
export class UserDetails {
    userId: string;
    name: string;
    when: number;
    avatar: string;

    constructor(userId: string,
        name: string,
        when: number,
        avatar: string) {
            this.userId = userId;
            this.name = name;
            this.when = when;
            this.avatar = avatar;
    }
}

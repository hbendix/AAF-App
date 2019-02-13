import { UserDetails } from 'src/app/users/shared/user-details';

/**
 * Model for displaying list of files
 */
export class FileList {

    id: number;
    version: number;
    title: string;
    fileType: string;
    size: number;
    sizeType: string;
    createdBy: UserDetails;

    constructor (
        id: number,
        version: number,
        title: string,
        fileType: string,
        size: number,
        sizeType: string,
        createdBy: UserDetails) {
            this.id = id;
            this.version = version;
            this.title = title;
            this.fileType = fileType;
            this.size = size;
            this.sizeType = sizeType;
            this.createdBy = createdBy;
    }
}

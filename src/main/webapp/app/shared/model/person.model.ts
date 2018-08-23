import { Moment } from 'moment';

export interface IPerson {
    id?: number;
    name?: string;
    address?: string;
    info?: string;
    dob?: Moment;
    imageContentType?: string;
    image?: any;
    faceId1?: string;
    faceId2?: string;
    owner?: string;
    facesCount?: number;
}

export class Person implements IPerson {
    constructor(
        public id?: number,
        public name?: string,
        public address?: string,
        public info?: string,
        public dob?: Moment,
        public imageContentType?: string,
        public image?: any,
        public faceId1?: string,
        public faceId2?: string,
        public owner?: string,
        public facesCount?: number
    ) {}
}

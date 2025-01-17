import {ModelBase} from './model-base';

export interface User extends ModelBase {
    full_name: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
}

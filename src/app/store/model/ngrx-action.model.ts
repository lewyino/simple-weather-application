import {Action} from '@ngrx/store';

export class NgrxActionModel<T = undefined> implements Action {
    type: string;
    payload: T;
}

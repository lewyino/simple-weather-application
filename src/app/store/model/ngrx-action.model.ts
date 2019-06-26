import {Action} from '@ngrx/store';

export class NgrxActionModel<T = undefined> implements Action {
    public type: string;
    public payload: T;
}

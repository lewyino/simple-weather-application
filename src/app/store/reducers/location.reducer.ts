import {NgrxActionModel} from '../model/ngrx-action.model';
import {LocationActionEnum} from '../actions/location.action';
import {LocationStateInterface} from '../model/location-state.interface';

const initialState: LocationStateInterface = {
    list: [],
    selected: null,
};

export function reducer(state: LocationStateInterface = initialState, action: NgrxActionModel): LocationStateInterface {
    switch (action.type) {
        case LocationActionEnum.LOAD_LOCATIONS_SUCCESS:
            return {
                ...state,
                list: action.payload
            };

        case LocationActionEnum.SELECT_LOCATION:
            return {
                ...state,
                selected: action.payload
            };

        default: {
            return state;
        }
    }
}

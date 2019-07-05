import {NgrxActionModel} from '../model/ngrx-action.model';
import {LocationActionEnum} from '../actions/location.action';
import {LocationStateInterface} from '../model/location-state.interface';
import {LocationModel} from '../../models/location.model';

const initialState: LocationStateInterface = {
    list: [],
    selected: null,
};

export function reducer(state: LocationStateInterface = initialState, action: NgrxActionModel<any>): LocationStateInterface {
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

        case LocationActionEnum.DELETE_SUCCESS:
            const list = state.list.filter((location: LocationModel) => location.id !== action.payload.id);
            let selected = state.selected;
            if (selected && selected.id === action.payload.id) {
                if (list.length > 0) {
                    selected = list[0];
                } else {
                    selected = null;
                }
            }
            return {
                list,
                selected,
            };

        default: {
            return state;
        }
    }
}

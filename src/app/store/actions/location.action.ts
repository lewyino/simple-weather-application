import {NgrxActionModel} from '../model/ngrx-action.model';
import {LocationModel} from '../../models/location.model';

export enum LocationActionEnum {
    LOAD_LOCATIONS = '[LocationAction] LOAD_LOCATIONS',
    LOAD_LOCATIONS_SUCCESS = '[LocationAction] LOAD_LOCATIONS_SUCCESS',
    LOAD_LOCATIONS_FAILED = '[LocationAction] LOAD_LOCATIONS_FAILED',
    SELECT_LOCATION = '[LocationAction] SELECT_LOCATION',
    ADD = '[LocationAction] ADD',
    ADD_SUCCESS = '[LocationAction] ADD_SUCCESS',
    ADD_FAILED = '[LocationAction] ADD_FAILED',
}

export class LoadLocationsAction extends NgrxActionModel {
    type: LocationActionEnum.LOAD_LOCATIONS;
}

export class LoadLocationsSuccessAction extends NgrxActionModel<LocationModel[]> {
    type: LocationActionEnum.LOAD_LOCATIONS_SUCCESS;

    constructor(locations: LocationModel[]) {
        super();
        this.payload = locations;
    }
}

export class LoadLocationsFailedAction extends NgrxActionModel {
    type: LocationActionEnum.LOAD_LOCATIONS_FAILED;
}

export class SelectLocationsAction extends NgrxActionModel<LocationModel> {
    type: LocationActionEnum.SELECT_LOCATION;

    constructor(location: LocationModel) {
        super();
        this.payload = location;
    }
}

export class AddLocationsAction extends NgrxActionModel<LocationModel> {
    type: LocationActionEnum.ADD;

    constructor(location: LocationModel) {
        super();
        this.payload = location;
    }
}

export class AddLocationsSuccessAction extends NgrxActionModel {
    type: LocationActionEnum.ADD_SUCCESS;
}

export class AddLocationsFailedAction extends NgrxActionModel {
    type: LocationActionEnum.ADD_FAILED;
}




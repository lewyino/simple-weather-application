import {NgrxActionModel} from '../model/ngrx-action.model';
import {LocationModel} from '../../models/location.model';

export enum LocationActionEnum {
    LOAD_LOCATIONS = '[LocationAction] LOAD_LOCATIONS',
    LOAD_LOCATIONS_SUCCESS = '[LocationAction] LOAD_LOCATIONS_SUCCESS',
    LOAD_LOCATIONS_FAILED = '[LocationAction] LOAD_LOCATIONS_FAILED',
    LOAD_LOCATION = '[LocationAction] LOAD_LOCATION',
    LOAD_LOCATION_SUCCESS = '[LocationAction] LOAD_LOCATION_SUCCESS',
    LOAD_LOCATION_FAILED = '[LocationAction] LOAD_LOCATION_FAILED',
    SELECT_LOCATION = '[LocationAction] SELECT_LOCATION',
    ADD = '[LocationAction] ADD',
    ADD_SUCCESS = '[LocationAction] ADD_SUCCESS',
    ADD_FAILED = '[LocationAction] ADD_FAILED',
    EDIT = '[LocationAction] EDIT',
    EDIT_SUCCESS = '[LocationAction] EDIT_SUCCESS',
    EDIT_FAILED = '[LocationAction] EDIT_FAILED',
    DELETE = '[LocationAction] DELETE',
    DELETE_SUCCESS = '[LocationAction] DELETE_SUCCESS',
    DELETE_FAILED = '[LocationAction] DELETE_FAILED',
}

export class LoadLocationsAction extends NgrxActionModel {
    readonly type = LocationActionEnum.LOAD_LOCATIONS;
}

export class LoadLocationsSuccessAction extends NgrxActionModel<LocationModel[]> {
    readonly type = LocationActionEnum.LOAD_LOCATIONS_SUCCESS;

    constructor(locations: LocationModel[]) {
        super();
        this.payload = locations;
    }
}

export class LoadLocationsFailedAction extends NgrxActionModel {
    readonly type = LocationActionEnum.LOAD_LOCATIONS_FAILED;
}

export class LoadLocationAction extends NgrxActionModel<string> {
    readonly type = LocationActionEnum.LOAD_LOCATION;

    constructor(locationId: string) {
        super();
        this.payload = locationId;
    }
}

export class LoadLocationSuccessAction extends NgrxActionModel<LocationModel> {
    readonly type = LocationActionEnum.LOAD_LOCATION_SUCCESS;

    constructor(location: LocationModel) {
        super();
        this.payload = location;
    }
}

export class LoadLocationFailedAction extends NgrxActionModel {
    readonly type = LocationActionEnum.LOAD_LOCATION_FAILED;
}

export class SelectLocationsAction extends NgrxActionModel<LocationModel> {
    readonly type = LocationActionEnum.SELECT_LOCATION;

    constructor(location: LocationModel) {
        super();
        this.payload = location;
    }
}

export class AddLocationAction extends NgrxActionModel<LocationModel> {
    readonly type = LocationActionEnum.ADD;

    constructor(location: LocationModel) {
        super();
        this.payload = location;
    }
}

export class AddLocationSuccessAction extends NgrxActionModel<boolean> {
    readonly type = LocationActionEnum.ADD_SUCCESS;

    constructor(result: boolean) {
        super();
        this.payload = result;
    }
}

export class AddLocationFailedAction extends NgrxActionModel {
    readonly type = LocationActionEnum.ADD_FAILED;
}

export class EditLocationAction extends NgrxActionModel<LocationModel> {
    readonly type = LocationActionEnum.EDIT;

    constructor(location: LocationModel) {
        super();
        this.payload = location;
    }
}

export class EditLocationSuccessAction extends NgrxActionModel<boolean> {
    readonly type = LocationActionEnum.EDIT_SUCCESS;

    constructor(result: boolean) {
        super();
        this.payload = result;
    }
}

export class EditLocationFailedAction extends NgrxActionModel<boolean> {
    readonly type = LocationActionEnum.EDIT_FAILED;
}

export class DeleteLocationsAction extends NgrxActionModel<LocationModel> {
    readonly type = LocationActionEnum.DELETE;

    constructor(location: LocationModel) {
        super();
        this.payload = location;
    }
}

export class DeleteLocationsSuccessAction extends NgrxActionModel<LocationModel> {
    readonly type = LocationActionEnum.DELETE_SUCCESS;

    constructor(location: LocationModel) {
        super();
        this.payload = location;
    }
}

export class DeleteLocationsFailedAction extends NgrxActionModel {
    readonly type = LocationActionEnum.DELETE_FAILED;
}


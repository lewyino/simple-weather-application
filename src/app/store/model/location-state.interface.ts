import {LocationModel} from '../../models/location.model';

export interface LocationStateInterface {
    list: LocationModel[];
    selected: LocationModel;
}

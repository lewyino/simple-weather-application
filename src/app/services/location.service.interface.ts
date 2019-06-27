import {Observable} from 'rxjs';
import {LocationModel} from '../models/location.model';

export interface LocationServiceInterface {
    getLocationsList(): Observable<LocationModel[]>;
    addLocation(location: LocationModel): boolean;
    editLocation(location: LocationModel): boolean;
    deleteLocation(location: LocationModel): boolean;
    getLocation(locationId: string): LocationModel;
}

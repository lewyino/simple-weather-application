import {Observable} from 'rxjs';
import {LocationModel} from '../models/location.model';

export interface LocationServiceInterface {
    getLocationsList(): Observable<LocationModel[]>;
    addLocation(location: LocationModel): Observable<boolean>;
    editLocation(location: LocationModel): Observable<boolean>;
    deleteLocation(location: LocationModel): Observable<boolean>;
    getLocation(locationId: string): Observable<LocationModel>;
}

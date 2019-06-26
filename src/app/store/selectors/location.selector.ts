import {ApplicationStateInterface} from '../model/application-state.interface';
import {createSelector} from '@ngrx/store';
import {LocationStateInterface} from '../model/location-state.interface';

const locationState = (state: ApplicationStateInterface): LocationStateInterface => state.location;

export const getLocationsList = createSelector(
    locationState,
    (state: LocationStateInterface) => state.list
);

export const getSelectedLocation = createSelector(
    locationState,
    (state: LocationStateInterface) => state.selected
);

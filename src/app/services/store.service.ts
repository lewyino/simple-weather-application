import {Injectable} from '@angular/core';
import {LocationModel} from '../models/location.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {DarkskyService} from './darksky.service';
import {LocationServiceInterface} from './location.service.interface';

@Injectable({
    providedIn: 'root'
})
export class StoreService implements LocationServiceInterface {

    private locationsList$: BehaviorSubject<LocationModel[]> = new BehaviorSubject([]);
    private readonly LOCATIONS_LIST_KEY = 'locationList';

    constructor(private darkskyService: DarkskyService) {
        if (!localStorage.getItem(this.LOCATIONS_LIST_KEY)) {
            localStorage.setItem(this.LOCATIONS_LIST_KEY, JSON.stringify(this.initData()));
        }
    }

    getLocationsList(): Observable<LocationModel[]> {
        this.loadLocationsList();
        return this.locationsList$;
    }

    loadLocationsList(): void {
        const data = this.getDataFromLocalStorage();
        this.locationsList$.next(data);
    }

    addLocation(location: LocationModel): Observable<boolean> {
        const list = this.getDataFromLocalStorage();
        list.push(location);
        localStorage.setItem(this.LOCATIONS_LIST_KEY, JSON.stringify(list));
        this.locationsList$.next(list);
        return of(true);
    }

    editLocation(location: LocationModel): Observable<boolean> {
        const list = this.getDataFromLocalStorage();
        const elemToEdit = list.find((item: LocationModel) => item.id === location.id);
        if (!elemToEdit) {
            console.error(`No location: ${location.name} (id: ${location.id})`);
            return of(false);
        }
        Object.assign(elemToEdit, location);
        localStorage.setItem(this.LOCATIONS_LIST_KEY, JSON.stringify(list));
        this.locationsList$.next(list);
        return of(true);
    }

    deleteLocation(location: LocationModel): Observable<boolean> {
        const list = this.getDataFromLocalStorage();
        const elemIndex = list.findIndex((item: LocationModel) => item.id === location.id);
        if (elemIndex === -1) {
            console.error(`No location: ${location.name} (id: ${location.id})`);
            return of(false);
        }
        list.splice(elemIndex, 1);
        localStorage.setItem(this.LOCATIONS_LIST_KEY, JSON.stringify(list));
        this.locationsList$.next(list);
        return of(true);
    }

    getLocation(locationId: string): Observable<LocationModel> {
        const list = this.getDataFromLocalStorage();
        const location = list.find((item: LocationModel) => item.id === locationId);
        if (!location) {
            console.error(`No location: ${locationId})`);
            return of(null);
        }
        return of(location);
    }

    private initData(): LocationModel[] {
        return [
            new LocationModel({
                name: 'Poznań',
                lat: 52.406376,
                lng: 16.925167,
            })
        ];
    }

    private getDataFromLocalStorage(): LocationModel[] {
        try {
            const locationsList = localStorage.getItem(this.LOCATIONS_LIST_KEY);
            const data = JSON.parse(locationsList);
            return data || [];
        } catch (err) {
            return [];
        }
    }
}

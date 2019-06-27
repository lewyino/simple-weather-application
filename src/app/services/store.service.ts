import {Injectable} from '@angular/core';
import {LocationModel} from '../models/location.model';
import {WeatherForecastModel} from '../models/weather-forecast.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {DarkskyService} from './darksky.service';
import {DarkskyInterface} from '../models/interfaces/darksky.interface';
import {LocationServiceInterface} from './location.service.interface';

@Injectable({
    providedIn: 'root'
})
export class StoreService implements LocationServiceInterface {

    private locationsList$: BehaviorSubject<LocationModel[]> = new BehaviorSubject([]);
    private selectedLocationWeatherForecast$: BehaviorSubject<WeatherForecastModel> = new BehaviorSubject(null);
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

    getSelectedLocationWeatherForecast(): Observable<WeatherForecastModel> {
        return this.selectedLocationWeatherForecast$;
    }

    setSelectedLocationWeatherForecast(location: LocationModel): void {
        this.darkskyService
            .getDataForLatLng(location.lat, location.lng)
            .subscribe((data: DarkskyInterface) => {
                this.selectedLocationWeatherForecast$.next(
                    new WeatherForecastModel({
                        location,
                        ...data.currently,
                    })
                );
            });
    }

    addLocation(location: LocationModel): boolean {
        const list = this.getDataFromLocalStorage();
        list.push(location);
        localStorage.setItem(this.LOCATIONS_LIST_KEY, JSON.stringify(list));
        this.locationsList$.next(list);
        return true;
    }

    editLocation(location: LocationModel): boolean {
        const list = this.getDataFromLocalStorage();
        const elemToEdit = list.find((item: LocationModel) => item.id === location.id);
        if (!elemToEdit) {
            console.error(`No location: ${location.name} (id: ${location.id})`);
            return false;
        }
        Object.assign(elemToEdit, location);
        localStorage.setItem(this.LOCATIONS_LIST_KEY, JSON.stringify(list));
        this.locationsList$.next(list);
        return true;
    }

    deleteLocation(location: LocationModel): boolean {
        const list = this.getDataFromLocalStorage();
        const elemIndex = list.findIndex((item: LocationModel) => item.id === location.id);
        if (elemIndex === -1) {
            console.error(`No location: ${location.name} (id: ${location.id})`);
            return false;
        }
        list.splice(elemIndex, 1);
        localStorage.setItem(this.LOCATIONS_LIST_KEY, JSON.stringify(list));
        this.locationsList$.next(list);
        const selectedLocation = this.selectedLocationWeatherForecast$.getValue().location;
        if (location.id === selectedLocation.id) {
            if (list.length > 0) {
                this.setSelectedLocationWeatherForecast(list[0]);
            } else {
                this.setSelectedLocationWeatherForecast(null);
            }
        }
        return true;
    }

    getLocation(locationId: string): LocationModel {
        const list = this.getDataFromLocalStorage();
        const location = list.find((item: LocationModel) => item.id === locationId);
        if (!location) {
            console.error(`No location: ${locationId})`);
            return null;
        }
        return location;
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

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DarkskyInterface} from '../models/interfaces/darksky.interface';
import {DARKSKY_API_KEY} from '../config';
import {environment} from '../../environments/environment';
import {DarkskyMockService} from './darksky.mock.service';

@Injectable({
    providedIn: 'root',
    useFactory: (httpClient: HttpClient) => environment.mock ? new DarkskyMockService() : new DarkskyService(httpClient),
    deps: [HttpClient]
})
export class DarkskyService {

    private readonly API_URL = 'https://api.darksky.net/forecast/';
    private readonly API_KEY = DARKSKY_API_KEY;
    private LANG = 'en';
    private UNITS = 'ca';
    private readonly url = `${this.API_URL}${this.API_KEY}/{lat},{lng}?exclude=daily,hourly,flags&lang=${this.LANG}&units=${this.UNITS}`;

    constructor(private httpClient: HttpClient) {
        console.log('DarkskyService');
    }

    getDataForLatLng(lat: number, lng: number): Observable<DarkskyInterface> {
        return this.httpClient.jsonp<DarkskyInterface>(
            this.url
                .replace('{lat}', lat.toString())
                .replace('{lng}', lng.toString()),
            'callback'
        );
    }
}

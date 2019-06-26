import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LocationComponent} from './components/location/location.component';
import {LocationsListComponent} from './components/locations-list/locations-list.component';
import {WeatherMainComponent} from './components/weather-main/weather-main.component';
import {LocationWeatherComponent} from './components/location-weather/location-weather.component';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {WindBearingPipe} from './pipes/wind-bearing.pipe';
import {LocationFormComponent} from './components/location-form/location-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {DialogComponent} from './components/dialog/dialog.component';
import {AgmCoreModule} from '@agm/core';
import {GOOGLE_MAPS_API_KEY} from './config';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {LocationEffects} from './store/effects/location.effect';

@NgModule({
    declarations: [
        AppComponent,
        LocationComponent,
        LocationsListComponent,
        WeatherMainComponent,
        LocationWeatherComponent,
        WindBearingPipe,
        LocationFormComponent,
        DialogComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        AgmCoreModule.forRoot({
            apiKey: GOOGLE_MAPS_API_KEY
        }),
        AppRoutingModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([LocationEffects])
    ],
    entryComponents: [
        DialogComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WeatherMainComponent} from './components/weather-main/weather-main.component';
import {LocationFormComponent} from './components/location-form/location-form.component';

const routes: Routes = [
    {path: 'weather-forecast', component: WeatherMainComponent},
    {
        path: 'location-form', children: [
            {path: '', component: LocationFormComponent},
            {path: ':id', component: LocationFormComponent}
        ]
    },
    {path: '**', redirectTo: 'weather-forecast'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

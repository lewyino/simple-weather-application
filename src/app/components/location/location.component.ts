import {Component, Input, OnInit} from '@angular/core';
import {LocationModel} from '../../models/location.model';
import {StoreService} from '../../services/store.service';
import {DialogComponent} from '../dialog/dialog.component';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

    @Input() location: LocationModel;
    @Input() selected: boolean;
    @Input() first: boolean;

    constructor(private storeService: StoreService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
    }

    handleLocationClick() {
        this.storeService.setSelectedLocationWeatherForecast(this.location);
    }

    handleDeleteClick() {
        const result = this.storeService.deleteLocation(this.location);
        if (!result) {
            this.storeService.loadLocationsList();
            this.dialog.open(DialogComponent, {
                width: '250px',
                data: {message: `Location "${this.location.name}" with id: ${this.location.id} doesn't exist, locations list reloaded`},
            });
        }
    }

}

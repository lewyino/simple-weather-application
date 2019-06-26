import {Component, Input, OnInit} from '@angular/core';
import {LocationModel} from '../../models/location.model';
import {MatDialog} from '@angular/material';
import {ApplicationStateInterface} from '../../store/model/application-state.interface';
import {Store} from '@ngrx/store';
import {SelectLocationsAction} from '../../store/actions/location.action';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

    @Input() location: LocationModel;
    @Input() selected: boolean;
    @Input() first: boolean;

    constructor(private store: Store<ApplicationStateInterface>,
                private dialog: MatDialog) {
    }

    ngOnInit() {
    }

    handleLocationClick() {
        this.store.dispatch(new SelectLocationsAction(this.location));
    }

    handleDeleteClick() {
        // const result = this.storeService.deleteLocation(this.location);
        // if (!result) {
        //     this.storeService.loadLocationsList();
        //     this.dialog.open(DialogComponent, {
        //         width: '250px',
        //         data: {message: `Location "${this.location.name}" with id: ${this.location.id} doesn't exist, locations list reloaded`},
        //     });
        // }
    }

}

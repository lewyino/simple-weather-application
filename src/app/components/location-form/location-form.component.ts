import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationModel} from '../../models/location.model';
import {StoreService} from '../../services/store.service';
import {LocationInterface} from '../../models/interfaces/location.interface';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {LatLngInterface} from '../../models/interfaces/lat-lng.interface';
import {get} from 'lodash';

@Component({
    selector: 'app-location-form',
    templateUrl: './location-form.component.html',
    styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {

    form: FormGroup;
    error = false;
    type: 'add' | 'edit' = 'add';
    mapLatLng = {
        lat: 52,
        lng: 19,
    };
    private originalValue: Partial<LocationInterface> = {};

    constructor(private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private storeService: StoreService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            lat: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
            lng: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
        });
        const routeSnapshot = this.route.snapshot;
        if (routeSnapshot.params.id) {
            this.loadData(routeSnapshot.params.id);
        }
    }

    handleSubmitForm(): void {
        if (!this.form.valid) {
            this.error = true;
            return;
        }
        const location = new LocationModel(this.form.value);
        let fn = this.storeService.addLocation;
        if (this.originalValue.id) {
            location.id = this.originalValue.id;
            fn = this.storeService.editLocation;
        }
        const result = fn.call(this.storeService, location, this.form.value.type);
        if (result) {
            this.router.navigate(['/weather-forecast']);
        } else {
            this.error = true;
        }
    }

    handleResetForm(): void {
        this.form.reset(this.originalValue || {});
        this.handleLatLngBlur();
        this.error = false;
    }

    handleSetMarker(cords: LatLngInterface): void {
        this.form.patchValue({
            lng: parseFloat(cords.lng.toFixed(6)),
            lat: parseFloat(cords.lat.toFixed(6)),
        });
    }

    handleLatLngBlur() {
        this.mapLatLng = {
            lat: parseFloat(get(this, ['form', 'value', 'lat'])),
            lng: parseFloat(get(this, ['form', 'value', 'lng'])),
        };
    }

    private loadData(locationId: string): void {
        const data = this.storeService.getLocation(locationId);
        if (data) {
            this.originalValue = data;
            this.type = 'edit';
        } else {
            setTimeout(() => {
                this.dialog.open(DialogComponent, {
                    width: '250px',
                    data: {message: `Location with id: ${locationId} doesn't exist, you add new location`},
                });
            });
        }
        this.form.patchValue(this.originalValue);
    }
}

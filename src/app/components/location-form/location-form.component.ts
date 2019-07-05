import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationModel} from '../../models/location.model';
import {LocationInterface} from '../../models/interfaces/location.interface';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {LatLngInterface} from '../../models/interfaces/lat-lng.interface';
import {get} from 'lodash';
import {Store} from '@ngrx/store';
import {ApplicationStateInterface} from '../../store/model/application-state.interface';
import {Actions, ofType} from '@ngrx/effects';
import {AddLocationAction, EditLocationAction, LoadLocationAction, LocationActionEnum} from '../../store/actions/location.action';
import {takeWhile} from 'rxjs/operators';
import {NgrxActionModel} from '../../store/model/ngrx-action.model';

@Component({
    selector: 'app-location-form',
    templateUrl: './location-form.component.html',
    styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit, OnDestroy {

    form: FormGroup;
    error = false;
    type: 'add' | 'edit' = 'add';
    mapLatLng = {
        lat: 52,
        lng: 19,
    };
    private originalValue: Partial<LocationInterface> = {};
    private subscribe = true;

    constructor(private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private dialog: MatDialog,
                private store: Store<ApplicationStateInterface>,
                private actions$: Actions) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            lat: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
            lng: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
        });
        const routeSnapshot = this.route.snapshot;
        const locationId = routeSnapshot.params.id;
        this.initSubscribers(locationId);
        if (locationId) {
            this.store.dispatch(new LoadLocationAction(locationId));
        }
    }

    ngOnDestroy(): void {
        this.subscribe = false;
    }

    handleSubmitForm(): void {
        if (!this.form.valid) {
            this.error = true;
            return;
        }
        const location = new LocationModel(this.form.value);
        if (this.originalValue.id) {
            location.id = this.originalValue.id;
            this.store.dispatch(new EditLocationAction(location));
            return;
        }
        this.store.dispatch(new AddLocationAction(location));
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

    private initSubscribers(locationId: string) {
        this.actions$.pipe(
            ofType(LocationActionEnum.LOAD_LOCATION_SUCCESS),
            takeWhile(() => this.subscribe)
        ).subscribe((data: NgrxActionModel<LocationModel>) => {
            this.originalValue = data.payload;
            this.type = 'edit';
            this.form.patchValue(this.originalValue);
        });

        this.actions$.pipe(
            ofType(LocationActionEnum.LOAD_LOCATION_FAILED),
            takeWhile(() => this.subscribe)
        ).subscribe(() => {
            this.dialog.open(DialogComponent, {
                width: '250px',
                data: {message: `Location with id: ${locationId} doesn't exist, you add new location`},
            });
        });

        this.actions$.pipe(
            ofType(LocationActionEnum.ADD_SUCCESS, LocationActionEnum.EDIT_SUCCESS),
            takeWhile(() => this.subscribe)
        ).subscribe((result: boolean) => {
            if (result) {
                this.router.navigate(['/weather-forecast']);
            } else {
                this.error = true;
            }
        });
    }
}

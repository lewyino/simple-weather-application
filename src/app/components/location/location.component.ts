import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LocationModel} from '../../models/location.model';
import {MatDialog} from '@angular/material';
import {ApplicationStateInterface} from '../../store/model/application-state.interface';
import {Store} from '@ngrx/store';
import {DeleteLocationsAction, LocationActionEnum, SelectLocationsAction} from '../../store/actions/location.action';
import {Actions, ofType} from '@ngrx/effects';
import {takeWhile} from 'rxjs/operators';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnDestroy {

    @Input() location: LocationModel;
    @Input() selected: boolean;
    @Input() first: boolean;
    private subscribe = true;

    constructor(private store: Store<ApplicationStateInterface>,
                private dialog: MatDialog,
                private actions$: Actions) {
    }

    ngOnInit() {
        this.initSubscribers();
    }

    ngOnDestroy(): void {
        this.subscribe = false;
    }

    handleLocationClick() {
        this.store.dispatch(new SelectLocationsAction(this.location));
    }

    handleDeleteClick() {
        this.store.dispatch(new DeleteLocationsAction(this.location));
    }

    private initSubscribers() {
        this.actions$.pipe(
            ofType(LocationActionEnum.DELETE_FAILED),
            takeWhile(() => this.subscribe)
        ).subscribe(() => {
            this.dialog.open(DialogComponent, {
                width: '250px',
                data: {message: `Location "${this.location.name}" with id: ${this.location.id} doesn't exist, locations list reloaded`},
            });
        });
    }

}

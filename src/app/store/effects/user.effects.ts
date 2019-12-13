import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { UserActions } from '../actions/user.actions';
import { MockRestService } from '../../core/rest-service/mock-rest.service';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions,
              private restService: MockRestService) {}

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.requestUsers),
    mergeMap(() => this.restService.fetchUsers()
      .pipe(
        map(users => (UserActions.usersReceived({users}))),
        catchError(() => EMPTY)
      ))
    )
  );

}

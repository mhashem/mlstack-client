import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ClientSharedModule} from 'app/shared';
import {
  PersonComponent,
  PersonDeleteDialogComponent,
  PersonDeletePopupComponent,
  PersonDetailComponent,
  personPopupRoute,
  personRoute,
  PersonUpdateComponent
} from './';

const ENTITY_STATES = [...personRoute, ...personPopupRoute];

@NgModule({
  imports: [ClientSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PersonComponent,
    PersonDetailComponent,
    PersonUpdateComponent,
    PersonDeleteDialogComponent,
    PersonDeletePopupComponent
  ],
  entryComponents: [
    PersonComponent,
    PersonUpdateComponent,
    PersonDeleteDialogComponent,
    PersonDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClientPersonModule {
}

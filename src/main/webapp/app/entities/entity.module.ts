import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientPersonModule } from './person/person.module';
import { BrowserModule } from '@angular/platform-browser';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
    CommonModule,
    BrowserModule,
    ClientPersonModule,
    /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
  ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClientEntityModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClientSharedModule } from 'app/shared';
import {faceRoute} from "app/recognition/face/face.route";
import {FaceComponent} from "app/recognition/face/face.component";

const ENTITY_STATES = [...faceRoute];

@NgModule({
  imports: [ClientSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [FaceComponent],
  entryComponents: [FaceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FaceModule {}

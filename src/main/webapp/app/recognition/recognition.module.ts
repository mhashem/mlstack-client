import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {FaceModule} from "app/recognition/face/face.module";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FaceModule
  ],
  entryComponents: [],
  declarations: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecognitionModule {
}

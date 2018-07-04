import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { recognitionState } from './recognition.route';

@NgModule({
    imports: [RouterModule.forRoot(recognitionState, { useHash: true })],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClientRecognitionModule {}

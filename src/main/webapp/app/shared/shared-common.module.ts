import { NgModule } from '@angular/core';

import { ClientSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [ClientSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [ClientSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ClientSharedCommonModule {}

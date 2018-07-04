import { Route } from '@angular/router';

import { TrainingComponent } from 'app/recognition';
import { UserRouteAccessService } from 'app/core';

export const trainingRoute: Route = {
    path: 'training',
    component: TrainingComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Training'
    },
    canActivate: [UserRouteAccessService]
};

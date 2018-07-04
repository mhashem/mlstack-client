import { Routes } from '@angular/router';

const RECOGNITION_ROUTES = [];

export const recognitionState: Routes = [
    {
        path: 'recognition',
        children: RECOGNITION_ROUTES
    }
];

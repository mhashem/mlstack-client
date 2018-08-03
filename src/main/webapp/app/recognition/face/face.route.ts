import {Routes} from "@angular/router";
import {FaceComponent} from "app/recognition/face/face.component";

export const faceRoute: Routes = [
  {
    path: 'face-recognition',
    component: FaceComponent,
    data: {
      authorities: [],
      pageTitle: 'Face Recognition'
    }
  }
];

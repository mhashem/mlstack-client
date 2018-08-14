import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Face } from 'app/recognition/face/face';
import { ML_SERVER_API_URL } from 'app/app.constants';

@Injectable({
    providedIn: 'root'
})
export class FaceService {
    private mlServerUrl = 'http://' + ML_SERVER_API_URL;

    constructor(private http: HttpClient) {}

    recognizeImage(image: any): Observable<Face[]> {
        let formData = new FormData();
        formData.append('image', image, 'recognize-image.jpg');
        return this.http.post<Face[]>(`${this.mlServerUrl}/api/v1/faces/recognition`, formData, {});
    }
}

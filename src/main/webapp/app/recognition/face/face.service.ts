import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ML_SERVER_API_URL } from 'app/app.constants';

@Injectable({
    providedIn: 'root'
})
export class FaceService {
    private mlServerUrl = 'http://' + ML_SERVER_API_URL;

    constructor(private http: HttpClient) {}

    recognizeImage(image: any): void {
        let formData = new FormData();
        formData.append('image', image, 'recognize-image.jpg');
        this.http.post(`${this.mlServerUrl}/api/v1/faces/recognition`, formData, {}).subscribe(value => {
            console.log('Recognition called');
        });
    }
}

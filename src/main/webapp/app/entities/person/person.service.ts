import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import {ML_SERVER_API_URL, SERVER_API_URL} from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPerson } from 'app/shared/model/person.model';
import {RequestOptions} from "http";

type EntityResponseType = HttpResponse<IPerson>;
type EntityArrayResponseType = HttpResponse<IPerson[]>;

@Injectable({ providedIn: 'root' })
export class PersonService {
    private resourceUrl = SERVER_API_URL + 'api/people';

    private mlServerUrl = ML_SERVER_API_URL;

    constructor(private http: HttpClient) {}

    create(person: IPerson): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(person);
        return this.http
            .post<IPerson>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(person: IPerson): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(person);
        return this.http
            .put<IPerson>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPerson>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPerson[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    uploadImage(id: number, name: string, image: Blob): void /*Observable<HttpResponse<any>>*/ {
      console.log(`server: ${this.mlServerUrl}, id: ${id}, name: ${name}, image type: ${typeof image}`);

      let formData = new FormData();
      formData.append('personName', name);
      formData.append('faceImage', image, id + '.jpg');

      console.log(`POST url: ${this.mlServerUrl}/api/v1/faces/${id}/index`);

      this.http.post<any>(`${this.mlServerUrl}/api/v1/faces/${id}/index`,
        formData, {}).subscribe(c => {
          console.log(`type of ${typeof c}, response: ${c}`);
      });
    }

    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      var byteString = atob(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to an ArrayBuffer
      var arrayBuffer = new ArrayBuffer(byteString.length);
      var _ia = new Uint8Array(arrayBuffer);
      for (var i = 0; i < byteString.length; i++) {
        _ia[i] = byteString.charCodeAt(i);
      }

      var dataView = new DataView(arrayBuffer);
      var blob = new Blob([dataView], { type: mimeString });
      return blob;
    }

    typeOf(obj): any {
      return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
    }

    private convertDateFromClient(person: IPerson): IPerson {
        const copy: IPerson = Object.assign({}, person, {
            dob: person.dob != null && person.dob.isValid() ? person.dob.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dob = res.body.dob != null ? moment(res.body.dob) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((person: IPerson) => {
            person.dob = person.dob != null ? moment(person.dob) : null;
        });
        return res;
    }
}

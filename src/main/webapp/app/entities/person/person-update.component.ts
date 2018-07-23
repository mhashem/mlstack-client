import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { IPerson } from 'app/shared/model/person.model';
import { PersonService } from './person.service';

@Component({
    selector: 'jhi-person-update',
    templateUrl: './person-update.component.html'
})
export class PersonUpdateComponent implements OnInit {
    private _person: IPerson;
    isSaving: boolean;
    dobDp: any;

    @ViewChild('video') public video: ElementRef;
    @ViewChild('canvas') public canvas: ElementRef;

    public captures: Array<any>;

    localStream: any;

    constructor(
        private dataUtils: JhiDataUtils,
        private personService: PersonService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {
        this.captures = [];
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ person }) => {
            this.person = person;
        });
    }

    public ngAfterViewInit(): void {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                this.localStream = stream;
                this.video.nativeElement.src = window.URL.createObjectURL(stream);
                this.video.nativeElement.play();
            });
        }
    }

    ngOnDestroy(): void {
        this.video.nativeElement.pause();
        this.video.nativeElement.src = '';
        this.localStream.getTracks()[0].stop();
    }

    public capture(): void {
        const context = this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 640, 480);
        this.captures.push(this.canvas.nativeElement.toDataURL('image/png'));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
        console.log(event.target.files.length);
        for (let i = 0; i < event.target.files.length; i++) {
          this.captures.push(event.target.files[i]);
        }
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.person, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.person.id !== undefined) {
            this.subscribeToSaveResponse(this.personService.update(this.person));
        } else {
            this.subscribeToSaveResponse(this.personService.create(this.person));
        }
    }

    clearImage(index): void {
      this.captures.splice(index, 1);
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPerson>>) {
        result.subscribe((res: HttpResponse<IPerson>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(res) {
        this.isSaving = false;

        if (this.captures.length > 0) {
          this.captures.forEach(c => this.personService.uploadImage(res.body.id, res.body.name, c));
        }

        // this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get person() {
        return this._person;
    }

    set person(person: IPerson) {
        this._person = person;
    }

}

import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PersonService } from './person.service';
import { Person } from 'app/shared/model/person.model';

@Injectable()
export class PersonPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private personService: PersonService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.personService.find(id).subscribe(entityResponse => {
                    const person: Person = entityResponse.body;
                    if (person.dob) {
                        // fixme check how things are going here
                        /*person.dob = {
              year: person.dob.year(),
              month: person.dob.month() + 1,
              day: person.dob.day()
            };*/
                    }
                    this.ngbModalRef = this.personModalRef(component, person);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.personModalRef(component, new Person());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    personModalRef(component: Component, person: Person): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.person = person;
        modalRef.result.then(
            result => {
                this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
                this.ngbModalRef = null;
            },
            reason => {
                this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
                this.ngbModalRef = null;
            }
        );
        return modalRef;
    }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FaceService } from 'app/recognition/face/face.service';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ML_SERVER_API_URL } from 'app/app.constants';
import { Face } from 'app/recognition/face/face';

@Component({
    selector: 'jhi-face',
    templateUrl: './face.component.html',
    styles: []
})
export class FaceComponent implements OnInit {
    private mlServerUrl = 'http://' + ML_SERVER_API_URL + '/socket';
    private stompClient;

    localStream: any;
    captures: Array<any>;

    selectedImage: any;

    subscriptionId = 315;

    @ViewChild('video') public video: ElementRef;
    @ViewChild('canvas') public canvas: ElementRef;

    _this = this;

    faces: Array<Face>;

    constructor(private faceService: FaceService) {
        this.captures = [];

        this.faces = [];

        this.initializeWebSocketConnection();
    }

    ngOnInit() {}

    ngOnDestroy(): void {
        this.video.nativeElement.pause();
        this.video.nativeElement.src = '';
        this.localStream.getTracks()[0].stop();
        // this.stompClient.unsubscribe();
    }

    ngAfterViewInit(): void {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                this.localStream = stream;
                this.video.nativeElement.src = window.URL.createObjectURL(stream);
                this.video.nativeElement.play();
            });
        }
    }

    public capture(): void {
        const context = this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 450, 360);
        const image = this.canvas.nativeElement.toDataURL('image/jpeg;base64;');
        this.captures.push(image);
        this.selectedImage = image;
    }

    public recognize(): void {
        this.faces = [];
        // todo add loading
        this.faceService.recognizeImage(FaceComponent.dataURLtoBlob(this.selectedImage));
    }

    initializeWebSocketConnection() {
        let self = this;
        let ws = new SockJS(this.mlServerUrl);
        this.stompClient = Stomp.over(ws);
        this.stompClient.connect(
            {},
            function(frame) {
                self.stompClient.subscribe('/recognitions', message => {
                    if (message.body) {
                        const ff = JSON.parse(message.body);
                        self.bindData(ff);
                    }
                });
            },
            function(message) {
                // check message for disconnect
                console.log(message);
            }
        );
    }

    public bindData(fff): void {
        console.log(fff);
        fff.forEach(f => {
            this.faces.push(f);
        });
    }

    private static dataURLtoBlob(dataurl): Blob {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }
}

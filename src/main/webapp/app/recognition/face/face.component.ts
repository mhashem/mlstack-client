import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FaceService } from 'app/recognition/face/face.service';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ML_SERVER_API_URL } from 'app/app.constants';

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

    @ViewChild('video') public video: ElementRef;
    @ViewChild('canvas') public canvas: ElementRef;

    constructor(private faceService: FaceService) {
        this.captures = [];

        this.initializeWebSocketConnection();
    }

    ngOnInit() {}

    ngOnDestroy(): void {
        this.video.nativeElement.pause();
        this.video.nativeElement.src = '';
        this.localStream.getTracks()[0].stop();
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
        const context = this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 640, 480);
        const image = this.canvas.nativeElement.toDataURL('image/jpeg;base64;');
        this.captures.push(image);
        this.selectedImage = image;
    }

    public recognize(): void {
        this.faceService.recognizeImage(this.dataURLtoBlob(this.selectedImage)).subscribe(faces => {
            console.log(`type of ${typeof faces}, response: ${faces}`);

            faces.forEach(face => {
                console.log(face);
            });
        });
    }

    private dataURLtoBlob(dataurl): Blob {
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

    initializeWebSocketConnection() {
        let ws = new SockJS(this.mlServerUrl + '/socket');
        this.stompClient = Stomp.over(ws);
        let that = this;
        this.stompClient.connect({}, function(frame) {
            that.stompClient.subscribe('/recognitions', message => {
                if (message.body) {
                    console.log(message.body);
                }
            });
        });
    }
}

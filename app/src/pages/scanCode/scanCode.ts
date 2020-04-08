import {Component} from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import * as ENV from '../../environment/environment';
import {NavController} from 'ionic-angular';

@Component({
    selector: 'page-scanCode',
    templateUrl: 'scanCode.html'
})
export class ScanCodePage {
    createdCode = null;
    scannedCode = null;
    email = "";

    constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, public http: HttpClient, private storage : Storage) {
        this.storage.get('email').then((val) => {
          this.email = val;
          console.log('Your email is', val);
          this.scanCode();
        });
    }

    createRelationship(id, relationship) {
        this.http.post(ENV.APIURL + '/relationship/create', {"email": this.email, "relationship": relationship, "id": id})
            .subscribe(contacts => {
                alert("contacto agregado");
            }, err => {
                alert("error");
            });
    }

    scanCode() {
        this.barcodeScanner.scan().then(barcodeData => {
            this.scannedCode = barcodeData.text;
            if(this.scannedCode){
              var data = this.scannedCode.split(';');
              this.createRelationship(data[0], data[1]);
              this.navCtrl.pop();
            } else {
              console.log("Error al generar codigo QR")
            }
        }, (err) => {
            console.log('Error: ', err);
        });
    }
}

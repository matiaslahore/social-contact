import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {ScanCodePage} from '../scanCode/scanCode';
import {ShowCodePage} from '../showCode/showCode';
import { Storage } from '@ionic/storage';
import * as ENV from '../../environment/environment';

@Component({
    selector: 'page-jobProfile',
    templateUrl: 'jobProfile.html'
})
export class jobProfilePage {
    public items: Array<{ nombre: string, apellido: string, telefono: string }> = [];
    email = "";

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private storage: Storage) {
        this.storage.get('email').then((val) => {
          this.email = val;
          console.log('Your email is', val);
          this.showContacts();
        });
    }

    showContacts() {
      this.items = [];
      this.http.post<any[]>(ENV.APIURL + '/user/relationships', {"email": this.email, "relationship": "job"})
        .subscribe(contacts => {
          contacts.forEach((contact) => {
            this.items.push({
              nombre: contact.name,
              apellido: contact.lastname,
              telefono: contact.telephone,
            });
          });
        }, err => {
          console.log(err);
        });
    }

    doRefresh(event){
      this.showContacts();
      event.complete();
    }

    scanCode() {
        this.navCtrl.push(ScanCodePage, {profileCode: "job"});
    }

    showCode() {
        this.navCtrl.push(ShowCodePage, {profileCode: "job"});
    }

}

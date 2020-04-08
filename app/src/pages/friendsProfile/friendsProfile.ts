import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {ScanCodePage} from '../scanCode/scanCode';
import {ShowCodePage} from '../showCode/showCode';
import { Storage } from '@ionic/storage';
import * as ENV from '../../environment/environment';

@Component({
    selector: 'page-friendsProfile',
    templateUrl: 'friendsProfile.html'
})
export class friendsProfilePage {
    public items: Array<{ nombre: string, apellido: string, telefono: string }> = [];
    email = "";

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,
                private storage : Storage) {
        this.storage.get('email').then((val) => {
          this.email = val;
          console.log('Your email is', val);
          this.showContacts();
        });
    }

    doRefresh(event){
      this.showContacts();
      event.complete();
    }

    showContacts() {
      this.items = [];
      this.http.post<any[]>(ENV.APIURL + '/user/relationships', {"email": this.email, "relationship": "friend"})
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

    scanCode() {
        this.navCtrl.push(ScanCodePage);
    }

    showCode() {
        this.navCtrl.push(ShowCodePage, {profileCode: "friend"});
    }

}

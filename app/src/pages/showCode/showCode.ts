import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import * as ENV from '../../environment/environment';


@Component({
    selector: 'page-showCode',
    templateUrl: 'showCode.html'
})
export class ShowCodePage {
    createdCode = null;
    profileCode = "";
    email = "";

    constructor(public navParams: NavParams, public http: HttpClient, private storage : Storage) {
        this.storage.get('email').then((val) => {
          this.email = val;
          console.log('Your email is', val);
          this.profileCode = navParams.get("profileCode");
          this.getQrInfo();
        });
    }

    getQrInfo() {
        this.http.post(ENV.APIURL + '/profile', {"email": this.email, "profile": this.profileCode})
            .subscribe(data => {
                this.showCode(data);
            }, err => {
                console.log(err);
            });
    }

    showCode(data) {
        var strCode = data[0]['id_user_owner'] + ';' + data[0]['relationship'];
        this.createdCode = strCode;
    }
}

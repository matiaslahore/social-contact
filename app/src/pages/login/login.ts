import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http';
import * as ENV from '../../environment/environment';


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class LoginPage {

    login = <any>{}

    public emailsTest: Array<{ email: string }> = [];

    constructor(public navCtrl: NavController, private storage: Storage, public http: HttpClient) {
      this.getEmails();
    }

    getEmails() {
        this.http.get(ENV.APIURL + '/users')
            .subscribe(data => {
                this.addEmails(data);
            }, err => {
                console.log(err);
            });
    }

    addEmails(contacts) {
        if (contacts) {
            contacts.forEach((contact) => {
                this.emailsTest.push({
                    email: contact.email
                });
            });
        }
    }

    useThisEmail(email) {
        this.login.email = email.email;
    }

    openPage() {
        // Let's navigate from TabsPage to Page1
        this.navCtrl.setRoot(HomePage);
        //this.navCtrl.push(HomePage);
    }

    isEmailValid() {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.login.email);
    }

    saveEmail() {
      this.storage.set('email', this.login.email).then(() => {
        console.log("Login Successful with Email: " + this.login.email);
      });
    }
}


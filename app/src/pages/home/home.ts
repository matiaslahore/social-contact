import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {NavController} from "ionic-angular";
import {friendsProfilePage} from '../friendsProfile/friendsProfile';
import {jobProfilePage} from '../jobProfile/jobProfile';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public http: HttpClient, public navCtrl: NavController) { }

    showProfile(profile) {
        if (profile == 'friends') {
            this.navCtrl.push(friendsProfilePage);
        } else if (profile == 'job') {
            this.navCtrl.push(jobProfilePage);
        }
    }
}

import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import * as ENV from '../../environment/environment';


@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {

    myForm: FormGroup;
    email = "";
    public name = "";
    public lastname = "";
    public telephone = "";

    constructor(public navCtrl: NavController, public http: HttpClient, public formBuilder: FormBuilder,
                private storage: Storage) {
        this.storage.get('email').then((val) => {
          this.email = val;n
          console.log('Your email is', val);
          this.getUserData();
        });
        this.myForm = this.createMyForm();
    }

    getUserData() {
        this.http.post(ENV.APIURL + '/user', {"email": this.email})
            .subscribe(data => {
                this.loadUserData(data[0])
            }, err => {
                console.log(err);
            });
    }

    saveData() {
        var data = {
            "email": this.email,
            "name": this.myForm.value.name,
            "lastname": this.myForm.value.lastName,
            "telephone": this.myForm.value.number
        };
        this.http.put(ENV.APIURL + '/user', data).subscribe(data => {
          console.log("change saved correctly");
        }, err => {
          console.log(err);
        });
    }

    loadUserData(data) {
        if (data) {
            this.name = data['name'] ? data['name'] : "";
            this.lastname = data['lastname'] ? data['lastname'] : "";
            this.telephone = data['telephone'] ? data['telephone'] : "";
        }
    }

    createMyForm(data = null) {
        return this.formBuilder.group({
            name: ["", Validators.required],
            lastName: ["", Validators.required],
            number: ["", Validators.required],
        });
    }

}

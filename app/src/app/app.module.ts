import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {friendsProfilePage} from '../pages/friendsProfile/friendsProfile';
import {jobProfilePage} from '../pages/jobProfile/jobProfile';
import {ProfilePage} from '../pages/profile/profile';
import {ScanCodePage} from '../pages/scanCode/scanCode';
import {ShowCodePage} from '../pages/showCode/showCode';
import {LoginPage} from '../pages/login/login';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ProfilePage,
        ScanCodePage,
        ShowCodePage,
        friendsProfilePage,
        jobProfilePage,
        LoginPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        NgxQRCodeModule,
        HttpClientModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ProfilePage,
        ScanCodePage,
        ShowCodePage,
        friendsProfilePage,
        jobProfilePage,
        LoginPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        BarcodeScanner
    ]
})
export class AppModule {
}

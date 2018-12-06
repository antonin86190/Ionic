import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    latitude: number;
    longitude: number;

    constructor(public navCtrl: NavController, private geoloc: Geolocation, public alert: AlertController) {

        let watch = this.geoloc.watchPosition();
        watch.subscribe((data) => {
            this.geoloc.getCurrentPosition().then((resp) => {
                this.longitude = resp.coords.longitude;
                this.latitude = resp.coords.latitude;
            }).catch((error) => {
                if(error.code === 1){
                    console.log("Error");
                    this.showAlert();
                }
            });
        });
    }

    showAlert() {
        const alert = this.alert.create({
            title: 'Geolocalisation!',
            subTitle: 'Vous avez refuser d\'activer la localisation, pour pouvoir utiliser ce service, veuiller l\'activer dans vos paramètres!',
            buttons: ['OK']
        });
        alert.present();
    }
}

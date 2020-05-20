import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { HTTP } from '@ionic-native/http/ngx';
import { finalize } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public id_telegram = null;

  constructor(private route: Router, private toast: ToastController, private lg: LoginService, private nativeHttp: HTTP, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    let cekIdTelegram = localStorage.getItem("id_telegram");
    if(cekIdTelegram) {
      this.route.navigate(['/tabs/home']);
    } else {
      return;
    }
  }

  async error() {
    const toast = await this.toast.create({
      message: 'Maaf! Server masih gangguan.',
      duration: 2000,
      buttons: ['Tutup']
    });
    toast.present();
  }

  async gagal() {
    const toast = await this.toast.create({
      message: 'Username dan Password salah.',
      duration: 2000,
      buttons: ['Tutup']
    });
    toast.present();
  }

  async sukses() {
    const toast = await this.toast.create({
      message: 'Berhasil Login!.',
      duration: 1000,
      buttons: ['Tutup']
    });
    toast.present();
  }

  async login() {
    const getIdTelegram = this.id_telegram;

    let loading = await this.loadingCtrl.create();
    await loading.present();

    let nativeCall = this.nativeHttp.post('https://dava.jarvisid.com/api/login', {telegram_id: getIdTelegram}, {})

    from(nativeCall).pipe(
      finalize(() => loading.dismiss())
    )
    .subscribe(data => {
      let response = JSON.parse(data.data);
      if(response.status == 'success') {
        localStorage.setItem("id_telegram", response.telegram_id);
        localStorage.setItem("nama_teknisi", response.nama_teknisi);
        this.sukses();
        const r = this.route.navigate(['/tabs/home']);
        setTimeout(function(){
          return r;
        }, 1000);
      } else {
        this.gagal();
      }
    }, err => {
      console.log('JS Call Error: ', err);
      this.error();
    });
  }

}

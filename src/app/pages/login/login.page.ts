import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';
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

  constructor(private route: Router, private toast: ToastController, private lg: LoginService, private http: HttpClient, private nativeHttp: HTTP, private loadingCtrl: LoadingController) { }

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

    let nativeCall = this.nativeHttp.post('https://dava.jarvisid.com/api/login', {telegram_id: getIdTelegram}, {
      'Accept' : 'json',
      'Content-Type' : 'application/json'
    })

    from(nativeCall).pipe(
      finalize(() => loading.dismiss())
    )
    .subscribe(data => {
      console.log(data.headers);
      console.log(data.status);
      console.log(data.data);
      console.log(data.data.status);
      if(data.data.status == 'success') {
        localStorage.setItem("telegram_id", data.data.telegram_id);
        localStorage.setItem("nama_teknisi", data.data.nama_teknisi);
        this.sukses();
        setTimeout(function(){
          this.router.navigate(['/tabs/home']);
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

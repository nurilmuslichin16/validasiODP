import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validasi } from 'src/app/models/validasi.model';
import { ValidasiService } from 'src/app/services/validasi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  validasi: Validasi[];

  constructor(private router: Router, private validasiService: ValidasiService) {
    
  }

  ngOnInit() {
    let cekIdTelegram = localStorage.getItem("id_telegram");
    if(cekIdTelegram) {
      this.validasi = this.validasiService.getAllValidasi();
    } else {
      this.validasi = this.validasiService.getAllValidasi();
      this.router.navigate(['/login']);
    }
  } 

  detailHome(validasiId: number) {
    // this.router.navigateByUrl('/details');
    this.router.navigate(['/details', validasiId]);
  }
  
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}

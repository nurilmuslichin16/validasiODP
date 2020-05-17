import { Component, OnInit } from '@angular/core';
import { Validasi } from 'src/app/models/validasi.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidasiService } from 'src/app/services/validasi.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';
import { InsertBarcodeService } from 'src/app/services/insert-barcode.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  val: Validasi;
  validasiForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,private route: Router, private validasiService: ValidasiService, private insertBarcode: InsertBarcodeService, private barcodeScanner: BarcodeScanner, private toast: ToastController, private fb: FormBuilder) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const validasiId = parseInt(paramMap.get('id'));
      this.val = this.validasiService.getValidasi(validasiId);
    });

    this.validasiForm = this.fb.group({
      id_odp    : [''],
      port      : [''],
      barcode   : ['']
    });
  }

  async sukses() {
    const toast = await this.toast.create({
      message: 'Data tersimpan! Terimakasih sudah disiplin.',
      duration: 2000,
      buttons: ['Tutup']
    });
    toast.present();
  }

  async gagal() {
    const toast = await this.toast.create({
      message: 'Data belum tersimpan! Server gangguan.',
      duration: 2000,
      buttons: ['Tutup']
    });
    toast.present();
  }

  scanBarcode(selector) {
    this.barcodeScanner.scan().then(
      barcodeData => {
        document.getElementById(selector).textContent = barcodeData.text;
      }
    )
  }

  insertData(data) {
    this.insertBarcode.insert(data)
      .subscribe(
        data => {
          console.log(data);
          this.sukses();
        },
        error => {
          console.log('Error ', error);
          this.gagal();
        }
      )
  }

  cekData(data) {
    console.log(data);
  }

}

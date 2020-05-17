import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  qrData = null;
  elementType: 'url' | 'canvas' | 'img' = 'canvas';
  hasilScanBarcode = null;

  constructor(private barcodeScanner: BarcodeScanner, private base64ToGallery: Base64ToGallery, private ctrlToast: ToastController) { }

  ngOnInit() {
  }

  scanBarcode() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        this.hasilScanBarcode = barcodeData.text;
      }
    )
  }

  donwloadQR() {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpeg').toString();
    console.log('data', imageData);

    let data = imageData.split(',')[1];

    this.base64ToGallery.base64ToGallery(data,
      { prefix: '_img', mediaScanner: true })
      .then(async res => {
        console.log('hasil simpan: ', res)
        let toast = await this.ctrlToast.create({
          header: 'QR Code sudah tersimpan di gallery'
        });
        toast.present();
      }, err => console.log('err: ', err)
    );
  }

}

import { Injectable } from '@angular/core';
import { Validasi } from '../models/validasi.model';

@Injectable({
  providedIn: 'root'
})
export class ValidasiService {

  private validasi: Validasi[] = [
    {
      id: 1,
      odp: 'ODP-PKL-FN/109',
      tanggal_validasi: '30 April 2020',
      status: 0,
      validasi: [
        {
          port: 0,
          barcode: 'TQO06A5V9X41'
        },
        {
          port: 1,
          barcode: 'TQO06VP2GKCI'
        },
        {
          port: 2,
          barcode: 'TQO0XWTWGMHV'
        },
        {
          port: 3,
          barcode: '-'
        },
        {
          port: 4,
          barcode: 'TQO0VJ6FZMWN'
        }
      ]
    },
    {
      id: 2,
      odp: 'ODP-TEG-FK/098',
      tanggal_validasi: '22 April 2020',
      status: 0,
      validasi: [
        {
          port: 0,
          barcode: '-'
        },
        {
          port: 2,
          barcode: 'TQO0ZOUP9BC'
        },
        {
          port: 4,
          barcode: '-'
        }
      ]
    }
  ];

  constructor() { }

  getAllValidasi() {
    return [...this.validasi];
  }

  getValidasi(validasiId: number) {
    return {
      ...this.validasi.find(val => {
        return val.id == validasiId;
      })
    }
  }
}

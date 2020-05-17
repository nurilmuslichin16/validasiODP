import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-akun',
  templateUrl: './akun.page.html',
  styleUrls: ['./akun.page.scss'],
})
export class AkunPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem("id_telegram");
    localStorage.removeItem("getPassword");
    this.route.navigate(['/login']);
  }

}

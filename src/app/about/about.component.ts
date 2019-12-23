import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  users: boolean = false;
  about: boolean = true;

  goToAbout() {
    this.about = true;
    this.users = false;
  }

  goToUsers() {
    this.about = false;
    this.users = true;
  }

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { PaymentService } from '../core/services/payment/payment.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  modalRef: any;
  firstUser = [];
  secondUser = [];
  thirdUser = [];
  fourUser = [];
  dataUser;
  natalie: boolean = false;
  lucio: boolean = false;
  virgil: boolean = false;
  justice: boolean = false;


  openModal1(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.natalie = true;
    this.lucio = false;
    this.virgil = false;
    this.justice = false;
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.natalie = false;
    this.lucio = true;
    this.virgil = false;
    this.justice = false;
  }
  openModal3(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.natalie = false;
    this.lucio = false;
    this.virgil = true;
    this.justice = false;
  }
  openModal4(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.natalie = false;
    this.lucio = false;
    this.virgil = false;
    this.justice = true;
  }

  usersArray = [];
  constructor(
    private modalService: BsModalService,
    private paymentService: PaymentService
  ) { }

  userOne = {
    id: "26030644",
    name: "Natalie Sauer",
    phone: "(943) 017-7250",
    address: {
      street: "1879 Alfred Groves",
      city: "Edythtown",
      state: "Minnesota"
    }
  }

  userTwo = {
    id: "31179981",
    name: "Lucio Ziemann",
    phone: "(306) 833-7343",
    address: {
      street: "89303 Jeremy Common",
      city: "East Ashley",
      state: "Illinois"
    }
  }

  userThree = {
    id: "86901223",
    name: "Virgil Schimmel",
    phone: "(366) 506-7294",
    address: {
      street: "014 Nikko Port",
      city: "Marcellaburgh",
      state: "Alaska"
    }
  }

  userFour = {
    id: "58750696",
    name: "Justice Reinger",
    phone: "(167) 687-1257",
    address: {
      street: "57705 Greenholt Bypass",
      city: "Rutherfordtown",
      state: "Georgia"
    }
  }

  ngOnInit() {
    this.paymentService.getData(this.usersArray).subscribe(response => {
      console.log(123, response);
      this.dataUser = response;
      this.dataUser.forEach(element => {
        if (element.id === "26030644") {
          this.firstUser.push(element);
        } else if (element.id === "31179981") {
          this.secondUser.push(element)
        } else if (element.id === "86901223") {
          this.thirdUser.push(element)
        } else if (element.id === "58750696") {
          this.fourUser.push(element)
        }
      });
    });
  }

}

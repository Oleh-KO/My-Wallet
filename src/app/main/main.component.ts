import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment'
import 'moment/locale/ru'
import { PaymentService } from '../core/services/payment/payment.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [PaymentService]
})
export class MainComponent implements OnInit {

  @ViewChild("sumsum", { static: false }) sumsum: ElementRef;
  modalRef: BsModalRef;
  paymentArray;
  paymentArrayTwo = [];
  incomeArray = [];
  incomeArrayTwo = [];
  expanceArray = [];
  expanceArrayTwo = [];
  first: boolean = true;
  second: boolean = false;
  third: boolean = false;
  addMoneyNumber: number = 2000;

  about: boolean = false;
  myWallet: boolean = true;

  paymentForm = new FormGroup({
    Sum: new FormControl(''),
    Description: new FormControl(''),
    Date: new FormControl(''),
  });
  constructor(
    private modalService: BsModalService,
    private paymentService: PaymentService
  ) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  income() {
    document.getElementById('modal-body').style.border = '2px solid green';
  }
  expance() {
    document.getElementById('modal-body').style.border = '2px solid red';
  }

  newItem(template: TemplateRef<any>) {
    let paymentItem = {
      date: (<HTMLInputElement>document.getElementById('picker')).value,
      description: this.paymentForm.value.Description,
      sum: this.paymentForm.value.Sum,
      income: true

    };

    if (paymentItem.sum > 0) {
      paymentItem.income = true
    }
    else {
      paymentItem.income = false
      this.addMoneyNumber = this.addMoneyNumber - Number(Math.abs(this.paymentForm.value.Sum));
    }

    if (paymentItem.date === '' || paymentItem.sum === '' || paymentItem.description === '') {
      document.getElementById('picker').style.border = '1px solid red';
      document.getElementById('sum').style.border = '1px solid red';
      document.getElementById('description').style.border = '1px solid red';
    }
    else {
      this.paymentArray.push(paymentItem);
      console.log(this.paymentArray);
      this.addMoneyNumber += Number(this.paymentForm.value.Sum);


      this.paymentService.postData(paymentItem).subscribe(index => {
        console.log(111, paymentItem);
      });

      this.modalRef.hide();
      this.paymentForm.reset();
      document.location.reload(true);
    }

  }

  cancel() {
    this.modalRef.hide();
    this.paymentForm.reset();
  }

  goToWallet() {
    this.myWallet = true;
    this.about = false;
  }

  goToAbout() {
    this.myWallet = false;
    this.about = true;
  }

  delete(id, i) {
    console.log('dfs', i);

    this.paymentArrayTwo.splice(i, 1);
    this.paymentService.deleteData(id).subscribe(index => {
      console.log(index);
    });
    document.location.reload(true);
  }

  edit(i, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    let sum = document.getElementById('sum');
    let description = document.getElementById('description');
    let picker = document.getElementById('picker');
    this.paymentForm.value.Sum = this.paymentArray[i];
    setTimeout(() => {
      this.paymentArrayTwo.forEach(element => {
        if (element.id === i) {
          (<HTMLInputElement>document.getElementById('sum')).value = element.sum;
          this.paymentForm.value.Sum = element.sum;
          (<HTMLInputElement>document.getElementById('description')).value = element.description;
          this.paymentForm.value.Description = element.description;
          (<HTMLInputElement>document.getElementById('picker')).value = element.date;
          this.paymentForm.value.Date = element.description;
          this.paymentArrayTwo.splice(i, 1);
          this.paymentService.deleteData(i).subscribe(index => {
            console.log(index);
          });

        }
      });
    }, 1000);

  }

  allFunc() {
    this.first = true;
    this.second = false;
    this.third = false;
  }

  incomeFunc() {
    this.first = false;
    this.second = true;
    this.third = false;
  }

  expanceFunc() {
    this.first = false;
    this.second = false;
    this.third = true;
  }

  addMoney() {
    this.addMoneyNumber += 500;
  }

  removeMoney() {
    this.addMoneyNumber -= 500;
  }



  ngOnInit() {
    this.paymentService.getData(this.addMoneyNumber).subscribe(response => {
      this.paymentArray = response;
      this.paymentArray.forEach(element => {
        if (element.sum) {
          this.paymentArrayTwo.push(element)
        }
      });
      this.paymentArrayTwo.forEach(element => {
        if (element.income === true) {
          this.incomeArray.push(element);
        } else {
          this.expanceArray.push(element);

        }
        if (element.sum > 0) {
          element.income = true
          this.addMoneyNumber += Number(element.sum);
        }
        else {
          element.income = false
          this.addMoneyNumber = this.addMoneyNumber - Number(Math.abs(element.sum));
        }
      });
    });
  }

}

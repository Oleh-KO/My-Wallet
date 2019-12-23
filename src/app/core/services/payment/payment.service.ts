import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  public postData(req) {
    return this.httpClient.post<any>("http://localhost:3000/data", req);
  }
  public getData(req) {
    return this.httpClient.get<any>("http://localhost:3000/data", req);
  }
  public deleteData(req) {
    return this.httpClient.delete<any>("http://localhost:3000/data/" + req);
  }
}

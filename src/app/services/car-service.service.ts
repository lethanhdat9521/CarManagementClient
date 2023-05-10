import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {
  constructor(private http: HttpClient) { }
  getAllCars(): Observable<any[]>{
    return this.http.get<any[]>(environment.baseURL + "api/car/list");
  }
  addCar(addCarRequest: any): Observable<number> {
    addCarRequest.id = '0';
    return this.http.post<number>(environment.baseURL + 'api/car', addCarRequest);
  }
  getCar(id: number): Observable<any> {
    return this.http.get<any>(environment.baseURL + 'api/car/' + id);
  }
  updateCar(id: string, editCar: any): Observable<any>{
    return this.http.put<any>(environment.baseURL + 'api/car/' + id, editCar);
  }
  deleteCar(id: string): Observable<number>{
    return this.http.delete<number>(environment.baseURL + 'api/car/' + id);
  }
  createReceipt(receiptInput: any): Observable<any>{
    return this.http.post<number>(environment.baseURL + 'api/receipt' ,receiptInput);
  }
  getAllBrands(): Observable<any[]>{
return this.http.get<any[]>(environment.baseURL + "api/brand/list");
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { BookModel, ReservationModel, ResultModel } from '../models/models';

@Injectable({ providedIn: "root" })
export class ReserveService {
    private reservationAPIUrl = "http://localhost:3000/api/reservations/";
    reservationsObservable = new BehaviorSubject<ReservationModel[]>([]);
    reservationsObservable$ = this.reservationsObservable.asObservable();

    constructor(private http: HttpClient) {
        this.getAllReservations();
    }

    getAllReservations() {
        this.http.get<ResultModel<ReservationModel[]>>(this.reservationAPIUrl + "getAll").subscribe(result => {
            if (result.success) {
                this.reservationsObservable.next(result.data);
            }
        });
    }

    clearReservations() {
        this.http.delete<ResultModel<string>>(this.reservationAPIUrl + "clear").subscribe(result => {
            if (result.success) {
                this.getAllReservations();
            }
        });
    }

    saveReservations(reservationModel: ReservationModel) {
        this.http.post<ResultModel<ReservationModel>>(this.reservationAPIUrl + "post", reservationModel).subscribe(result => {
            if (result.success) {
                this.getAllReservations();
            }
        });
    }
}
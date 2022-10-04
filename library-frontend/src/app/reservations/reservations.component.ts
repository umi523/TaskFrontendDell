import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from '../book-catalouge/book-catalouge.service';
import { ReservationModel } from '../models/models';
import { ReserveService } from './reservations.service';
import { ReserveBookDialog } from './reserve-book/reserve-book.component';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  listOfReservations: ReservationModel[] = [];
  constructor(private reserveService: ReserveService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.reserveService.reservationsObservable$.subscribe((data: ReservationModel[]) => {
      this.listOfReservations = data;
    })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ReserveBookDialog, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  clear() {
    this.reserveService.clearReservations();
  }

  displayedColumns: string[] = ['book', 'user', 'start', 'end'];

}

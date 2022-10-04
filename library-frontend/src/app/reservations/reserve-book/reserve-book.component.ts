import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { start } from "@popperjs/core";
import * as moment from "moment";
import { BookService } from "src/app/book-catalouge/book-catalouge.service";
import { BookModel, ReservationModel } from "src/app/models/models";
import { ReserveService } from "../reservations.service";

@Component({
    selector: 'reserve-add-book',
    templateUrl: 'reserve-book.component.html',
})

export class ReserveBookDialog {
    requiredError = "Field is Required";
    dateError = "";
    listOfBooks: BookModel[] = [];

    formGroup: FormGroup = this.formBuilder.group({
        'bookId': [null, [Validators.required]],
        'userName': [null, Validators.required],
        'startDate': [null, [Validators.required]],
        'endDate': [null, [Validators.required]],
    });

    reservationsModel: ReservationModel | undefined;

    constructor(public dialogRef: MatDialogRef<ReserveBookDialog>,
        private formBuilder: FormBuilder,
        private reserveService: ReserveService, private bookService: BookService) { }

    ngOnInit(): void {
        this.bookService.booksObservable$.subscribe((data: BookModel[]) => {
            this.listOfBooks = data.filter(x => x.countLeft > 0);
        });
    }

    removeError() {
        this.dateError = "";
    }

    onSubmit(reservationsModel: ReservationModel) {
        var time = moment.duration(moment(reservationsModel.startDate).diff(moment(reservationsModel.endDate)));
        if (reservationsModel.startDate > reservationsModel.endDate) {
            this.dateError = "Fix your start date!"
        } else if (Math.abs(time.asHours()) < 1) {
            this.dateError = "Duration should be maximum 60 minutes!"
        }
        else {
            this.dateError = "";
            this.reservationsModel = reservationsModel;
            this.reserveService.saveReservations(reservationsModel);
            this.dialogRef.close();
            this.reserveService.getAllReservations();
        }

    }
}
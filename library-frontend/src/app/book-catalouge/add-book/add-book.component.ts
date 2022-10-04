import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { BookModel } from "src/app/models/models";
import { BookService } from "../book-catalouge.service";

@Component({
    selector: 'app-add-book',
    templateUrl: 'add-book.component.html',
})
export class AddBookDialog {

    requiredError = "Field is Required";
    formGroup: FormGroup = this.formBuilder.group({
        'title': [null, [Validators.required]],
        'description': [null, Validators.required],
        'count': [null, [Validators.required]],
    });;

    bookModel: BookModel | undefined;

    constructor(public dialogRef: MatDialogRef<AddBookDialog>,
        private formBuilder: FormBuilder,
        private bookService: BookService) { }

    onSubmit(bookModel: BookModel) {
        this.bookModel = bookModel;
        this.bookService.saveBook(bookModel);
        this.dialogRef.close();
        this.bookService.getAllBooks();
    }
}
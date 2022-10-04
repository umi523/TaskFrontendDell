import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookModel } from '../models/models';
import { AddBookDialog } from './add-book/add-book.component';
import { BookService } from './book-catalouge.service';

@Component({
  selector: 'app-book-catalouge',
  templateUrl: './book-catalouge.component.html',
  styleUrls: ['./book-catalouge.component.css'],
  providers: [BookService]
})
export class BookCatalougeComponent implements OnInit {
  listOfBooks: BookModel[] = [];
  constructor(private bookService: BookService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.bookService.booksObservable$.subscribe((data: BookModel[]) => {
      console.log("Show Books")
      this.listOfBooks = data;
    })
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddBookDialog, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  deleteBook(id: string) {
    this.bookService.deleteBook(id);
  }

  displayedColumns: string[] = ['title', 'description', 'count', 'countLeft', 'actions'];
}

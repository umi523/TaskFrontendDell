import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { BookModel, ResultModel } from '../models/models';

@Injectable({ providedIn: "root" })
export class BookService {

    private bookApiUrl = "http://localhost:3000/api/books/";
    booksObservable = new BehaviorSubject<BookModel[]>([]);
    booksObservable$ = this.booksObservable.asObservable();

    constructor(private http: HttpClient) {
        this.getAllBooks();
    }

    getAllBooks() {
        this.http.get<ResultModel<BookModel[]>>(this.bookApiUrl + "getAll").subscribe(result => {
            if (result.success) {
                this.booksObservable.next(result.data);
            }
        });
    }

    deleteBook(id: string) {
        this.http.delete<ResultModel<string>>(this.bookApiUrl + "delete/" + id).subscribe(result => {
            if (result.success) {
                this.getAllBooks();
            }
        });
    }

    saveBook(bookModel: BookModel) {
        this.http.post<ResultModel<BookModel>>(this.bookApiUrl + "post", bookModel).subscribe(result => {
            if (result.success) {
                this.getAllBooks();
            }
        });
    }
}
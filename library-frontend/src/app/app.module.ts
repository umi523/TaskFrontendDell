import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common';
import { BookCatalougeComponent } from './book-catalouge/book-catalouge.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from './book-catalouge/book-catalouge.service';
import { HttpClientModule } from '@angular/common/http';
import { AddBookDialog } from './book-catalouge/add-book/add-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationsComponent } from './reservations/reservations.component';
import { ReserveService } from './reservations/reservations.service';
import { ReserveBookDialog } from './reservations/reserve-book/reserve-book.component';

@NgModule({
  declarations: [
    AppComponent,
    BookCatalougeComponent,
    AddBookDialog,
    ReservationsComponent,
    ReserveBookDialog
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [BookService, ReserveService],
  bootstrap: [AppComponent]
})
export class AppModule { }

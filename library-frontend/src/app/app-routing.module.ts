import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCatalougeComponent } from './book-catalouge/book-catalouge.component';
import { ReservationsComponent } from './reservations/reservations.component';

const routes: Routes = [
  { path: 'books', component: BookCatalougeComponent },
  { path: 'reservations', component: ReservationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
